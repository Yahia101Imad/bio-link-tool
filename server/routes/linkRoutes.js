// IMPORT PACKAGES
const express = require("express");
const router = express.Router();
const { createLink } = require("../controllers/linkController");

router.post("/", createLink);

module.exports = router;