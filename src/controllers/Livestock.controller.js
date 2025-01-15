const livestockService = require("../services/Livestock.service");

exports.getAllLivestocks = async function (req, res) {
  try {
    const result = await livestockService.getAllLivestocks();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFarmLivestocks = async function (req, res) {
  try {
    const result = await livestockService.getFarmLivestocks(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLivestockDetail = async function (req, res) {
  try {
    const result = await livestockService.getLivestockDetail(req.params);
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

exports.getFilteredLivestocks = async function (req, res) {
  try {
    const result = await livestockService.getFilteredLivestocks(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
