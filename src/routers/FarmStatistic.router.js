const Express = require("express");
const router = Express.Router();
const farmStatisticController = require("../controllers/FarmStatistic.controller");

router.get(
  "/livestock-count/:farmId",
  farmStatisticController.getLivestockCountByFarmId
);

module.exports = router;
