const Express = require("express");
const router = Express.Router();
const farmStatisticController = require("../controllers/FarmStatistic.controller");

router.get(
  "/get-cows-count/:farmId",
  farmStatisticController.getCowsCountByFarmId
);

router.get(
  "/livestock-count/:farmId",
  farmStatisticController.getLivestockCountByFarmId
);

// router.get(
//   "/get-female-cows-count-by-farmId/:farmId",
//   farmStatisticController.getFemaleCowsCountByFarmId
// );

// router.get(
//   "/get-male-cows-count-by-farmId/:farmId",
//   farmStatisticController.getMaleCowsCountByFarmId
// );

// router.get(
//   "/get-goats-count-by-farmId/:farmId",
//   farmStatisticController.getGoatsCountByFarmId
// );

// router.get(
//   "/get-female-goats-count-by-farmId/:farmId",
//   farmStatisticController.getFemaleGoatsCountByFarmId
// );

// router.get(
//   "/get-male-goats-count-by-farmId/:farmId",
//   farmStatisticController.getMaleGoatsCountByFarmId
// );

// router.get(
//   "/get-sheep-count-by-farmId/:farmId",
//   farmStatisticController.getSheepCountByFarmId
// );

// router.get(
//   "/get-female-sheep-count-by-farmId/:farmId",
//   farmStatisticController.getFemaleSheepCountByFarmId
// );

// router.get(
//   "/get-male-sheep-count-by-farmId/:farmId",
//   farmStatisticController.getMaleSheepCountByFarmId
// );

module.exports = router;
