const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config");
const { CityRepo } = require("../repositories");
const { AppError } = require("../utils");
const cityRepo = new CityRepo();
const { UniqueConstraintError } = require("sequelize");

async function createCity(data) {
  try {
    const city = await cityRepo.create(data);
    return city;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new AppError("City already exists", StatusCodes.CONFLICT);
    }

    throw new AppError("Cannot create City", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCities() {
  try {
    const cities = await cityRepo.getall();
    console.log(cities);
    return cities;
  } catch (error) {
    console.error(error.message);
    console.error(error.name);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCity(id) {
  try {
    const city = await cityRepo.get(id);
    return city;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function destroyCity(id) {
  try {
    const city = await cityRepo.destroy(id);
    return city;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
module.exports = { createCity, getCities, getCity, destroyCity };
