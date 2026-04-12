const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamId: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    abbreviation: { type: String, required: true, trim: true, uppercase: true },
    conference: { type: String, required: true, enum: ["East", "West"] },
    division: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

teamSchema.index({ conference: 1, division: 1 });
teamSchema.index({ name: 1 });

module.exports = mongoose.model("Team", teamSchema);