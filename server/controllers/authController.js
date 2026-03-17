// IMPORT PACKAGES
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Link = require("../models/Link");
const AppError = require("../utils/AppError");

// GENERATE A JWT TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// CONTROLLERS
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    // CREATING TOKEN
    const token = createToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //FIND USER BY EMAIL
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Incorrect email", 400);
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new AppError("Incorrect password", 400);
    }

    // CREATING TOKEN
    const token = createToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

// PROFILE USER CONTROLLER
const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const links = await Link.find({ userId: user._id });

    res.status(200).json({
      status: "success",
      data: {
        user: {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        links,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

module.exports = { register, login, getProfile };
