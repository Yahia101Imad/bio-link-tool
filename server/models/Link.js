const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      match: [/https?:\/\/.+/, "Please enter a valid URL"]
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const link = mongoose.model("Link", linkSchema);

module.exports = link;
