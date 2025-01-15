const milkProductionService = require("../services/MilkProduction.service");

exports.addNewMilkProduction = async function (req, res) {
  try {
    const result = await milkProductionService.addNewMilkProduction(
      req.params,
      req.body
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMilkProduction = async function (req, res) {
  try {
    const result = await milkProductionService.getMilkProduction(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
