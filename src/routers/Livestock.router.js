const Express = require("express");
const router = Express.Router();
const livestockController = require("../controllers/Livestock.controller");

router.get("/get-all-livestocks", livestockController.getAllLivestocks);

router.get("/get-farm-livestocks/:farmId", livestockController.getFarmLivestocks);
router.get("/get-livestock-detail/:livestockId", livestockController.getLivestockDetail);

router.post(
  "/create-new-livestock/:farmId",
  livestockController.createNewLivestock
);

router.get(
  "/get-filtered-livestocks",
  livestockController.getFilteredLivestocks
);

// router.put("/change-livestock-phase/:livestockId", livestockController);

module.exports = router;
