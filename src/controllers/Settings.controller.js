const settingsService = require("../services/Settings.service");

exports.setCustomId = async function (req, res) {
  try {
    const result = await settingsService.setCustomId(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setDurationPhase = async function (req, res) {
  try {
    const result = await settingsService.setDurationPhase(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
