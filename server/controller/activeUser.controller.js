// controllers/activeUser.controller.js
const ActiveUser = require("../model/activeUser.model");

exports.getActiveUsers = async (req, res) => {
  try {
    const { contentId } = req.params;

    const activeUsers = await ActiveUser.find({ contentId })
      .populate('userId', 'username avatarColor')
      .sort({ lastActive: -1 });

    res.status(200).json({ success: true, data: activeUsers });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = exports;