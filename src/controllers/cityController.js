const { CityServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { AppError } = require("../utils");

//Post request /cities
async function createCity(req, res) {
  try {
    const city = await CityServices.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
async function getCities(req, res) {
  console.log("City Controller Hit");
  try {
    console.log("Before Controller");
    console.log(CityServices);
    console.log(CityServices.getCities);
    const cities = await CityServices.getCities();
    console.log("cities");
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getCity(req, res) {
  try {
    const city = await CityServices.getCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const city = await CityServices.destroyCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json(ErrorResponse);
  }
}

module.exports = { createCity, getCities, getCity, destroyCity };
