const Express = require("express");
const router = Express.Router();
const medicationController = require("../controllers/Medication.controller");

router.get("/get-all-medication", medicationController.getAllMedications);

router.post(
  "/add-new-medication/:farmId",
  medicationController.addNewMedication
);

module.exports = router;
