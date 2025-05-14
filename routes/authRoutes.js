const {
  authorizeClient,
  getAccess,
  logout,
} = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.get("/auth/google", authorizeClient);

router.get("/auth/google/callback", getAccess);

router.get("/logout", logout);

module.exports = router;
