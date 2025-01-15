const Express = require("express");
const router = Express.Router();
const lactationController = require("../controllers/Lactation.controller");

// router.get(
//   "/get-lactation-data-by-livestockId/:livestockId",
//   lactationController.getLactationDataByLivestockId
// );

router.put(
  "/update-lactation/:livestockId",
  lactationController.updateLactation
);

router.post("/add-spouse/:livestockId", lactationController.addSpouse);
router.get(
  "/get-spouse-nameId/:livestockId",
  lactationController.getSpouseNameId
);

module.exports = router;
