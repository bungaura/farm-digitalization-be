const Express = require("express");
const router = Express.Router();
const farmStatisticController = require("../controllers/FarmStatistic.controller");

router.get(
  "/livestock-count/:farmId",
  farmStatisticController.getLivestockCountByFarmId
);

router.get(
  "/milk-production-count/:farmId",
  farmStatisticController.getMilkProductionByFarmId
);

module.exports = router;
