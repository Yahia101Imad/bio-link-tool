// IMPORT PACKAGES
const Link = require("../models/Link");

const createLink = async (req, res) => {
  try {
    const { title, url, order } = req.body;

    const newLink = await Link.create({
      title,
      url,
      order,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Link created successfully",
      link: newLink,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { createLink };