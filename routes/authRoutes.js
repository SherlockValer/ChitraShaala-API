const {
  authorizeClient,
  getAccess,
  logout,
} = require("../controllers/authController");
const { getUser } = require("../controllers/userController");
const protect = require("../middlewares/authmiddleware");

const express = require("express");
const router = express.Router();

router.get("/auth/google", authorizeClient);

router.get("/auth/google/callback", getAccess);

router.get("/me", protect, getUser);

router.get("/logout", logout);

module.exports = router;
