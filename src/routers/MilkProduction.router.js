const Express = require("express");
const router = Express.Router();
const milkProductionController = require("../controllers/MilkProduction.controller");

router.post(
  "/add-new-milk-production/:livestockId",
  milkProductionController.addNewMilkProduction
);

router.get(
  "/get-milk-production/:livestockId",
  milkProductionController.getMilkProduction
);

module.exports = router;
