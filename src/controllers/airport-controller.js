const { AirportServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const airport = await AirportServices.createAirport({
      name: req.body.name,
      code: req.body.code,
      citId: req.body.citId,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airport = await AirportServices.getAirports();
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
async function getAirport(req, res) {
  try {
    const airport = await AirportServices.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json(ErrorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    const airport = await AirportServices.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json(ErrorResponse);
  }
}
module.exports = { createAirport, getAirports, getAirport, deleteAirport };
