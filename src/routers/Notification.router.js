const Express = require("express");
const router = Express.Router();
const notificationController = require("../controllers/Notification.controller");

router.post("/invite-operator/:farmId", notificationController.inviteOperator);

router.post(
  "/accept-invitation/:operatorEmail",
  notificationController.acceptInvitation
);

router.post(
  "/read-notifications/:userId",
  notificationController.readNotifications
);

router.get(
  "/get-all-farm-members/:farmId",
  notificationController.getAllMembers
);

module.exports = router;
