const { FlightRepo } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const flightRepo = new FlightRepo();

async function createFlight(data) {
  try {
    const flight = await flightRepo.create(data);
    return flight;
  } catch (error) {
    console.error(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlights() {
  try {
    const response = await flightRepo.getall();
    return response;
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id) {
  try {
    const response = await flightRepo.get(id);
    return response;
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function destroyFlight(id) {
  try {
    const response = await flightRepo.destroy(id);
    return response;
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
  createFlight,
  getFlights,
  getFlight,
  destroyFlight,
};
