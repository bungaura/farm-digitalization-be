const Express = require("express");
const router = Express.Router();
const phasesConfigurationController = require("../controllers/PhasesConfiguration.controller");

router.post(
  "/add-phases-configuration/:farmId",
  phasesConfigurationController.addPhasesConfiguration
);

router.put(
  "/change-phase-configuration/:farmId",
  phasesConfigurationController.changePhaseConfiguration
);

router.get(
  "/get-phases-configuration/:farmId",
  phasesConfigurationController.getPhasesConfiguration
);

module.exports = router;
