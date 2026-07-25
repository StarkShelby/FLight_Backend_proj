const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config");
const { AirportRepo } = require("../repositories");
const { AppError } = require("../utils");
const airportRepo = new AirportRepo();

async function createAirport(data) {
  try {
    const airport = await airportRepo.create(data);
    return airport;
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirports() {
  try {
    const airport = await airportRepo.getall();
    return airport;
  } catch (error) {
    console.error(error.message);
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepo.get(id);
    return airport;
  } catch (error) {
    console.error(error.message);
    throw new AppError(
      "Cannot fetch data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepo.destroy(id);
    return response;
  } catch (error) {
    console.log(error.statusCode);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The Airport is not present", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Cannot delete Airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = { createAirport, getAirports, getAirport, destroyAirport };
