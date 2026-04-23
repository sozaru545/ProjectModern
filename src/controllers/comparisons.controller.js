const Comparison = require("../models/Comparison");

exports.listComparisons = async (req, res, next) => {
  try {
    const comparisons = await Comparison.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: comparisons.length, comparisons });
  } catch (err) {
    next(err);
  }
};

exports.createComparison = async (req, res, next) => {
  try {
    const { playerOneId, playerTwoId, title } = req.body;

    if (!playerOneId || !playerTwoId || !title) {
      res.status(400);
      throw new Error("playerOneId, playerTwoId, and title are required");
    }

    const comparison = await Comparison.create({
      userId: req.user.id,
      playerOneId: Number(playerOneId),
      playerTwoId: Number(playerTwoId),
      title
    });

    res.status(201).json({ message: "comparison_created", comparison });
  } catch (err) {
    next(err);
  }
};

exports.deleteComparison = async (req, res, next) => {
  try {
    const deleted = await Comparison.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      res.status(404);
      throw new Error("comparison not found");
    }

    res.json({ message: "comparison_deleted" });
  } catch (err) {
    next(err);
  }
};