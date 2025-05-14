const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const albumSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.UUID,
    default: () => randomUUID(),
  },
  name: {
    type: String,
    required: [true, "name field cannot be empty"],
  },
  description: { type: String },
  ownerId: {
    type: mongoose.Schema.Types.UUID,
    ref: "User",
    required: true,
  },
  sharedUsers: { type: [String] },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
