const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    playerId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    teamId: { type: Number, required: true } // links to Team.teamId
  },
  { timestamps: true }
);

// Useful indexes (non-duplicate)
playerSchema.index({ teamId: 1 });
playerSchema.index({ lastName: 1, firstName: 1 });

module.exports = mongoose.model("Player", playerSchema);