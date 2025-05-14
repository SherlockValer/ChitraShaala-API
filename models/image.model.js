const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const imageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.UUID,
    default: () => randomUUID(),
  },
  albumId: {
    type: mongoose.Schema.Types.UUID,
    ref: "Album",
    required: true,
  },
  name: { type: String, required: true },
  url: { type: String, required: true },
  tags: { type: [String] },
  person: { type: String },
  isFavorite: { type: Boolean, default: false },
  comments: { type: [String] },
  uploadedAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
