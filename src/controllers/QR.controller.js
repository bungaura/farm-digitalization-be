const qrService = require("../services/QR.service");

exports.generateQR = async function (req, res) {
  try {
    const result = await qrService.generateQR(req.params, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
