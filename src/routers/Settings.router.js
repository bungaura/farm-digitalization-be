const Express = require("express");
const router = Express.Router();
const settingsController = require("../controllers/Settings.controller");

router.post("/set-customId/:farmId", settingsController.setCustomId);

module.exports = router;
