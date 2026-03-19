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
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

const getUserLinks = async (req, res) => {
  try {
    const userLinks = await Link.find({ userId: req.user._id });

    res.status(200).json(userLinks);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

const deleteUserLink = async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    res.status(200).json({
      status: "success",
      link,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || "fail",
      message: error.message,
    });
  }
};

const updateLink = async (req, res, next) => {
  try {
    const { title, url } = req.body;
    const { id } = req.params;

    // ✅ تحقق من المدخلات
    if (!title || !url) {
      return next(new AppError("Title and URL are required", 400));
    }

    // ✅ تحديث الرابط
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url },
      {
        new: true, // يرجع الداتا بعد التحديث
        runValidators: true, // يشغل validation
      }
    );

    // ❌ إذا لم يوجد
    if (!updatedLink) {
      return next(new AppError("Link not found", 404));
    }

    // ✅ نجاح
    res.status(200).json({
      status: "success",
      data: {
        link: updatedLink,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createLink, getUserLinks, deleteUserLink, updateLink };
