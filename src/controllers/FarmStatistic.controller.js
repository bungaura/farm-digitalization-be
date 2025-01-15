const farmStatisticService = require("../services/FarmStatistic.service");

exports.getLivestockCountByFarmId = async function (req, res) {
  try {
    const result = await farmStatisticService.getLivestockCountByFarmId(req.params, req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};