const lactationService = require("../services/Lactation.service");

exports.getLactationDataByLivestockId = async function (req, res) {
  try {
    const result = await lactationService.getLactationDataByLivestockId(
      req.params
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addSpouse = async function (req, res) {
  try {
    const result = await lactationService.addSpouse(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLactation = async function (req, res) {
  try {
    const result = await lactationService.updateLactation(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSpouseNameId = async function (req, res) {
  try {
    const result = await lactationService.getSpouseNameId(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
