// IMPORT PACKAGES
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// GENERATE A JWT TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// CONTROLLERS
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Incorrect email or password");
    }
    const auth = await user.comparePassword(password);
    if (!auth) {
      throw new Error("Incorrect email or password");
    }
    const token = createToken(user._id);
    
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports = { register, login };
