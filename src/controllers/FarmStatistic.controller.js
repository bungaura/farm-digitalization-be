const farmStatisticService = require("../services/FarmStatistic.service");

exports.getCowsCountByFarmId = async function (req, res) {
  try {
    const result = await farmStatisticService.getCowsCountByFarmId(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.getFemaleCowsCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getFemaleCowsCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMaleCowsCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getMaleCowsCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getGoatsCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getGoatsCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getFemaleGoatsCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getFemaleGoatsCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMaleGoatsCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getMaleGoatsCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getSheepCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getSheepCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getFemaleSheepCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getFemaleSheepCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMaleSheepCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getMaleSheepCountByFarmId(req.params);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.getLivestockCountByFarmId = async function (req, res) {
  try {
    const { farmId } = req.params;
    const { type, gender, condition, phase, status } = req.query;

    const filters = { farm_id : farmId }
    if (type) filters.type_id = type.toUpperCase();
    if (gender) filters.gender = gender.toUpperCase();
    if (condition) filters.condition = condition;
    if (phase) filters.phase = phase.toUpperCase();
    if (status) filters.status = status;

    const result = await farmStatisticService.getLivestockCountByFarmId(farmId, filters);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};