const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

// post: api/v1/flights

router.post(
  "/",
  FlightMiddlewares.validateCreate,
  FlightController.createFlight,
);

module.exports = router;
