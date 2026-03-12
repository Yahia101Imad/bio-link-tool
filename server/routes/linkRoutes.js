// IMPORT PACKAGES
const express = require("express");
const router = express.Router();
const { createLink } = require("../controllers/linkController");
const {protect} = require("../middleware/authMiddleware");

router.post("/", protect, createLink);

module.exports = router;