const diseaseService = require("../services/Disease.service");

exports.getAllDiseases = async function (req, res) {
  try {
    const result = await diseaseService.getAllDiseases(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addNewDisease = async function (req, res) {
  try {
    const result = await diseaseService.addNewDisease(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
