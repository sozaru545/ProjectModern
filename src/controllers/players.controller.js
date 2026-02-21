const Player = require("../models/Player");

exports.listPlayers = async (req, res, next) => {
  try {
    const { teamId, q } = req.query;

    const filter = {};
    if (teamId) filter.teamId = Number(teamId);
    if (q) {
      filter.$or = [
        { firstName: new RegExp(q, "i") },
        { lastName: new RegExp(q, "i") }
      ];
    }

    const players = await Player.find(filter).sort({ lastName: 1, firstName: 1 }).limit(200);
    res.json({ count: players.length, players });
  } catch (err) {
    next(err);
  }
};

exports.getPlayerByPlayerId = async (req, res, next) => {
  try {
    const playerId = Number(req.params.playerId);
    const player = await Player.findOne({ playerId });

    if (!player) {
      res.status(404);
      throw new Error("player not found");
    }

    res.json({ player });
  } catch (err) {
    next(err);
  }
};

// Phase 1: allow creating players (later lock to admin / ingestion job)
exports.createPlayer = async (req, res, next) => {
  try {
    const { playerId, firstName, lastName, teamId } = req.body;

    if (!playerId || !firstName || !lastName || !teamId) {
      res.status(400);
      throw new Error("playerId, firstName, lastName, teamId are required");
    }

    const created = await Player.create({
      playerId: Number(playerId),
      firstName,
      lastName,
      teamId: Number(teamId)
    });

    res.status(201).json({ message: "player_created", player: created });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409);
      return next(new Error("playerId already exists"));
    }
    next(err);
  }
};