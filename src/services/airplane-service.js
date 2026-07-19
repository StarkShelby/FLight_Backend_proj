const { logger } = require("../config");
const { AirplaneRepo } = require("../repositories");
const { AppError } = require("../utils");
const airplaneRepo = new AirplaneRepo();

async function createPlanes(data) {
  console.log("service hit");
  try {
    const airplane = await airplaneRepo.create(data);
    return airplane;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepo.getall();
    return airplanes;
  } catch (error) {
    console.error(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepo.get(id);
    return airplane;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
module.exports = { createPlanes, getAirplanes, getAirplane };
