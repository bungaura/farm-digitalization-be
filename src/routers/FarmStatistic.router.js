const Express = require("express");
const router = Express.Router();
const farmStatisticController = require("../controllers/FarmStatistic.controller");

router.get(
  "/livestock-count/:farmId",
  farmStatisticController.getLivestockCountByFarmId
);

router.get(
  "/monthly-milk-production-count/:farmId",
  farmStatisticController.getMilkProductionByFarmId
);

router.get(
  "/monthly-livestock-sold-count/:farmId",
  farmStatisticController.getLivestockSoldCountByFarmId
);

router.get(
  "/average-milk-production-count/:year",
  farmStatisticController.getAverageMilkProductionByYear
);

// router.get(
//   "/lactation-count/:farmId",
//   farmStatisticController.getLactationCountByFarmId
// );

module.exports = router;
