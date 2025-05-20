const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const albumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => randomUUID(),
    },
    name: {
      type: String,
      required: [true, "name field cannot be empty"],
    },
    description: { type: String },
    ownerId: {
      type: String,
      ref: "User",
      required: true,
    },
    sharedUsers: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
