const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    playerId: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, playerId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);