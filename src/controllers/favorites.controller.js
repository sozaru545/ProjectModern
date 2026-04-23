const Favorite = require("../models/Favorite");

exports.listFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: favorites.length, favorites });
  } catch (err) {
    next(err);
  }
};

exports.createFavorite = async (req, res, next) => {
  try {
    const { playerId } = req.body;

    if (!playerId) {
      res.status(400);
      throw new Error("playerId is required");
    }

    const favorite = await Favorite.create({
      userId: req.user.id,
      playerId: Number(playerId)
    });

    res.status(201).json({ message: "favorite_created", favorite });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409);
      return next(new Error("favorite already exists"));
    }
    next(err);
  }
};

exports.deleteFavorite = async (req, res, next) => {
  try {
    const deleted = await Favorite.findOneAndDelete({
      userId: req.user.id,
      playerId: Number(req.params.playerId)
    });

    if (!deleted) {
      res.status(404);
      throw new Error("favorite not found");
    }

    res.json({ message: "favorite_deleted" });
  } catch (err) {
    next(err);
  }
};