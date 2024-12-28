const Express = require("express");
const router = Express.Router();
const livestockController = require("../controllers/Livestock.controller");

router.get("/get-all-livestocks", livestockController.getAllLivestocks);

router.post(
  "/create-new-livestock/:farmId",
  livestockController.createNewLivestock
);

module.exports = router;
