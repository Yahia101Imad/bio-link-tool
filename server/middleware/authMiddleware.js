// IMPORT PACKAGES
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. READING TOKEN FROM HEADER
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized, token missing",
    });
  }

  try {
    // 2️. CHECK IF TOKEN IS CORRECT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️. PUT USER ON REQ WITHOUT PASSWORD
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = protect;
