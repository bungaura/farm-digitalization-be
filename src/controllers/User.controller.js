const userService = require("../services/User.service");

exports.getAllUsers = async function (req, res) {
  try {
    const result = await userService.getAllUsers(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async function (req, res) {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async function (req, res) {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};