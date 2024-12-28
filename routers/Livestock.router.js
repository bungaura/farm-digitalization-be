const Express = require("express");
const router = Express.Router();
const livestockController = require("../controllers/Livestock.controller");

router.get("/get-all-livestocks", livestockController.getAllLivestocks);

module.exports = router;
