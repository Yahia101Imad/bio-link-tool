const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

// PUBLIC ROUTES
router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/profile/:username", getProfile);

module.exports = router;
