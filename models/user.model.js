const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.UUID,
    default: () => randomUUID(),
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "input is not an email"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
