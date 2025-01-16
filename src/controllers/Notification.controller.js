const notificationService = require("../services/Notification.service");

exports.inviteOperator = async function (req, res) {
  try {
    const result = await notificationService.inviteOperator(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.acceptInvitation = async function (req, res) {
  try {
    const result = await notificationService.acceptInvitation(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.readNotifications = async function (req, res) {
  try {
    const result = await notificationService.readNotifications(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMembers = async function (req, res) {
  try {
    const result = await notificationService.getAllMembers(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
