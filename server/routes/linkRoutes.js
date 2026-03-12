// IMPORT PACKAGES
const express = require("express");
const router = express.Router();
const { createLink, getUserLinks } = require("../controllers/linkController");

router.post("/", createLink);
router.get("/", getUserLinks);

module.exports = router;