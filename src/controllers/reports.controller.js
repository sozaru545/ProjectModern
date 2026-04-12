const mongoose = require("mongoose");
const Report = require("../models/Report");
const Player = require("../models/Player");

exports.listReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("createdBy", "email role");

    res.json({ count: reports.length, reports });
  } catch (err) {
    next(err);
  }
};

exports.createReport = async (req, res, next) => {
  try {
    const { title, description, playersCompared } = req.body;

    if (!title || !Array.isArray(playersCompared) || playersCompared.length < 1) {
      res.status(400);
      throw new Error("title and playersCompared are required");
    }

    const normalizedPlayers = playersCompared.map(Number);

    const playersFound = await Player.countDocuments({
      playerId: { $in: normalizedPlayers }
    });

    if (playersFound !== normalizedPlayers.length) {
      res.status(400);
      throw new Error("one or more playerIds do not exist");
    }

    const report = await Report.create({
      title,
      description: description || "",
      createdBy: req.user.id,
      playersCompared: normalizedPlayers
    });

    res.status(201).json({ message: "report_created", report });
  } catch (err) {
    next(err);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("invalid report id");
    }

    const report = await Report.findById(req.params.id).populate("createdBy", "email role");

    if (!report) {
      res.status(404);
      throw new Error("report not found");
    }

    res.json({ report });
  } catch (err) {
    next(err);
  }
};

exports.deleteReportById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("invalid report id");
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      res.status(404);
      throw new Error("report not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = report.createdBy && report.createdBy.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "Forbidden: only the owner or admin can delete this report"
      });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.json({ message: "report_deleted" });
  } catch (err) {
    next(err);
  }
};