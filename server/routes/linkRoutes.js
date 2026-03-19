// IMPORT PACKAGES
const express = require("express");
const router = express.Router();
const { createLink, getUserLinks, deleteUserLink, updateLink } = require("../controllers/linkController");

router.post("/", createLink);
router.get("/", getUserLinks);
router.delete("/:id", deleteUserLink);
router.put("/:id", updateLink);

module.exports = router;