const medicationService = require("../services/Medication.service");

exports.getAllMedications = async function (req, res) {
  try {
    const result = await medicationService.getAllMedications(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addNewMedication = async function (req, res) {
  try {
    const result = await medicationService.addNewMedication(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
