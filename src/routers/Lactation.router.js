const Express = require("express");
const router = Express.Router();
const lactationController = require("../controllers/Lactation.controller");

router.get(
  "/get-lactation-data-by-livestockId/:livestockId",
  lactationController.getLactationDataByLivestockId
);

module.exports = router;
