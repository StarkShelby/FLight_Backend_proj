const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post("/", CityMiddlewares.validateCreate, CityController.createCity);
router.get(
  "/",
  (req, res, next) => {
    console.log("City Route Hit");
    next();
  },
  CityController.getCities,
);

router.get(
  "/:id",
  (req, res, next) => {
    console.log("id route hit");
    next();
  },
  CityController.getCity,
);

router.delete("/:id", CityController.destroyCity);

module.exports = router;
