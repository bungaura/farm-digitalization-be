const logActivityService = require("../services/LogActivity.service");

exports.addNewLogActivity = async function (req, res) {
  try {
    const result = await logActivityService.addNewLogActivity(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLogActivities = async function (req, res) {
  try {
    const result = await logActivityService.getLogActivities(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
