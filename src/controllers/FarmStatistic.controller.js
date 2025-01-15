const farmStatisticService = require("../services/FarmStatistic.service");

exports.getLivestockCountByFarmId = async function (req, res) {
  try {
    const result = await farmStatisticService.getLivestockCountByFarmId(req.params, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMilkProductionByFarmId = async function (req, res) {
  try {
    const result = await farmStatisticService.getMilkProductionByFarmId(req.params, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLivestockSoldCountByFarmId = async function (req, res) {
  try {
    const result = await farmStatisticService.getLivestockSoldCountByFarmId(req.params, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.getLactationCountByFarmId = async function (req, res) {
//   try {
//     const result = await farmStatisticService.getLactationCountByFarmId(req.params, req.query);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };