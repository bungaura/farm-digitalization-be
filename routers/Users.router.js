const Express = require("express");
const router = Express.Router();
const userController = require("../controllers/User.controller");

router.get("/get-all-users", userController.getAllUsers);

module.exports = router;
