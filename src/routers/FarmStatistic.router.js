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

router.get(
  "/livestock-sold-count/:farmId",
  farmStatisticController.getLivestockSoldCountByFarmId
);


// router.get(
//   "/lactation-count/:farmId",
//   farmStatisticController.getLactationCountByFarmId
// );

module.exports = router;
