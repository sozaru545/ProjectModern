const Report = require("../models/Report");

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
      throw new Error("title and playersCompared (array with at least 1 playerId) are required");
    }

    // Phase 1: createdBy is optional; if token exists, attach user
    const createdBy = req.user?.id || undefined;

    const report = await Report.create({
      title,
      description: description || "",
      createdBy,
      playersCompared: playersCompared.map(Number)
    });

    res.status(201).json({ message: "report_created", report });
  } catch (err) {
    next(err);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
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
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      res.status(404);
      throw new Error("report not found");
    }
    res.json({ message: "report_deleted" });
  } catch (err) {
    next(err);
  }
};