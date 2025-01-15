const farmService = require("../services/Farm.service");

exports.addNewFarm = async function (req, res) {
  try {
    const result = await farmService.addNewFarm(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFarmByOwnerId = async function (req, res) {
  try {
    const result = await farmService.getFarmByOwnerId(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
