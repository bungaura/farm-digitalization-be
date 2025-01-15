const Express = require("express");
const router = Express.Router();
const qrController = require("../controllers/QR.controller");

router.post("/generate-qr/:websiteLink", qrController.generateQR);

module.exports = router;
