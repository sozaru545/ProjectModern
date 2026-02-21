const Team = require("../models/Team");

exports.listTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({ conference: 1, division: 1, name: 1 });
    res.json({ count: teams.length, teams });
  } catch (err) {
    next(err);
  }
};

exports.getTeamByTeamId = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    const team = await Team.findOne({ teamId });

    if (!team) {
      res.status(404);
      throw new Error("team not found");
    }

    res.json({ team });
  } catch (err) {
    next(err);
  }
};

// Phase 1: allow creating teams (later you can lock this to admin)
exports.createTeam = async (req, res, next) => {
  try {
    const { teamId, name, abbreviation, conference, division } = req.body;

    if (!teamId || !name || !abbreviation || !conference || !division) {
      res.status(400);
      throw new Error("teamId, name, abbreviation, conference, division are required");
    }

    const created = await Team.create({
      teamId: Number(teamId),
      name,
      abbreviation,
      conference,
      division
    });

    res.status(201).json({ message: "team_created", team: created });
  } catch (err) {
    // handle duplicate key nicely
    if (err.code === 11000) {
      res.status(409);
      return next(new Error("teamId already exists"));
    }
    next(err);
  }
};