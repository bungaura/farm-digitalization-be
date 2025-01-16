const Express = require("express");
const router = Express.Router();
const logActivityController = require("../controllers/LogActivity.controller");

router.post(
  "/add-new-log-activity/:farmId/:userId",
  logActivityController.addNewLogActivity
);

router.get(
  "/get-log-activities/:farmId",
  logActivityController.getLogActivities
);

module.exports = router;
