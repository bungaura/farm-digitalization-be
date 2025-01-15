const Express = require("express");
const router = Express.Router();
const farmController = require("../controllers/Farm.controller");

router.post("/add-farm/:userId", farmController.addNewFarm);
router.get("/get-farm-by-owner-id/:userId", farmController.getFarmByOwnerId);

module.exports = router;
