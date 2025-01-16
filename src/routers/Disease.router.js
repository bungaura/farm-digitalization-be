const Express = require("express");
const router = Express.Router();
const diseaseController = require("../controllers/Disease.controller");

router.get("/get-all-disease", diseaseController.getAllDiseases);

router.post(
  "/add-new-disease/:farmId",
  diseaseController.addNewDisease
);

module.exports = router;