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
