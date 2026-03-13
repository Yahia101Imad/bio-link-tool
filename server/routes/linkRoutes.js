// IMPORT PACKAGES
const express = require("express");
const router = express.Router();
const { createLink, getUserLinks, deleteUserLink } = require("../controllers/linkController");

router.post("/", createLink);
router.get("/", getUserLinks);
router.delete("/:id", deleteUserLink);

module.exports = router;