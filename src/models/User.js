const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["fan", "analyst", "admin"], default: "fan" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);