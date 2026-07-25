const express = require("express");

const { InfoController, FlightController } = require("../../controllers");
const AirplaneRoute = require("./airplane-route");
const CityRoutes = require("./cityRoutes");
const FlightRoute = require("./flight-routes");
const AirportRoute = require("./airport-route");

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/airplanes", AirplaneRoute);
router.use("/cities", CityRoutes);
router.use("/flights", FlightRoute);
router.use("/airports", AirportRoute);

module.exports = router;
