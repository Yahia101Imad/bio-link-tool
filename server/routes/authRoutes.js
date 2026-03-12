const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// PUBLIC ROUTES
router.post("/auth/register", register);
router.post("/auth/login", login);

// Protected route (requires auth middleware)
// router.get("/profile", protect, getProfile);

module.exports = router;
