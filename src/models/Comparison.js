const mongoose = require("mongoose");

const comparisonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    playerOneId: {
      type: Number,
      required: true
    },
    playerTwoId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

comparisonSchema.index({ userId: 1 });
comparisonSchema.index({ playerOneId: 1, playerTwoId: 1 });

module.exports = mongoose.model("Comparison", comparisonSchema);