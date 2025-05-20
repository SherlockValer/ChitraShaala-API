const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const imageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  albumId: {
    type: String,
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
