const livestockService = require("../services/Livestock.service");

exports.getAllLivestocks = async function (req, res) {
  try {
    const result = await livestockService.getAllLivestocks(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createNewLivestock = async function (req, res) {
  try {
    const result = await livestockService.createNewLivestock(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
