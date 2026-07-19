const { AirplaneServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneServices.createPlanes({
      flightName: req.body.flightName,
      capacity: req.body.capacity,
      boardingTime: req.body.boardingTime,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    throw error;
  }
}

async function getAirplanes(req, res) {
  try {
    const airplane = await AirplaneServices.getAirplanes();
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    throw error;
  }
}
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneServices.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    throw error;
  }
}

async function deleteAirplane(req, res) {
  try {
    const airplane = await AirplaneServices.destroyPlane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    throw error;
  }
}
module.exports = { createAirplane, getAirplanes, getAirplane, deleteAirplane };
