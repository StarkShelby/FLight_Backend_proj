const express = require("express");

const { InfoController } = require("../../controllers");
const AirplaneRoute = require("./airplane-route");
const CityRoutes = require("./cityRoutes");
const router = express.Router();

router.get("/info", InfoController.info);
router.use("/airplanes", AirplaneRoute);
router.use("/cities", CityRoutes);

module.exports = router;
