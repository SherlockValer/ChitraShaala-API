const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const kavioPixURI = process.env.MONGODB_URI;

async function connectDB() {
  await mongoose
    .connect(kavioPixURI, { dbName: "kavioPix" })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Error connecting to database", err));
}

module.exports = connectDB;
