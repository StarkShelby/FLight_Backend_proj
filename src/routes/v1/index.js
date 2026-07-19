const express = require("express");

const { InfoController } = require("../../controllers");
const AirplaneRoute = require("./airplane-route");

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/airplanes", AirplaneRoute);

module.exports = router;
