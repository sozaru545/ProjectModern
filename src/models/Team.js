const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
{
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  conference: { type: String, enum: ["East", "West"], required: true }
},
{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);