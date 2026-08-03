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

router.get("/", FlightController.getFlights);
//v1/flights/search?trips=MUM-DEL
router.get("/search", FlightController.getAllFlights);
router.get("/:id", FlightController.getFlight);
router.delete("/:id", FlightController.destroyFlight);

// api/v1/flights/:id/update. PATCH request
router.patch("/:id/seats", FlightController.updateSeats);

module.exports = router;
