const { FlightRepo } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");
const { Op } = require("sequelize");
const flightRepo = new FlightRepo();

async function createFlight(data) {
  try {
    const flight = await flightRepo.create(data);
    return flight;
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      throw new AppError("Duplicate Flight ", StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      error.message || "Cannot create new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
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
    if (!response) {
      throw new AppError("The Flight is not present", StatusCodes.NOT_FOUND);
    }
    return response;
  } catch (error) {
    // 2. Execution jumps into catch block.
    // 3. JS checks: "Is this error an instance of AppError class?"
    if (error instanceof AppError) throw error;
    // 4. YES! Pass the ORIGINAL 404 AppError up to the Controller!
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function destroyFlight(id) {
  try {
    const response = await flightRepo.destroy(id);
    if (!response) {
      throw new AppError("The Flight is not present", StatusCodes.NOT_FOUND);
    }
    return response;
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];

  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");

    customFilter = {
      departureAirportId,
      arrivalAirportId,
    };
  }
  if (query.price) {
    const [minPrice, maxprice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxprice === undefined ? 20000 : maxprice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    const startDay = `${query.tripDate} 00:00:00`;
    const endDay = `${query.tripDate} 23:59:00`;
    customFilter.departureTime = {
      [Op.between]: [startDay, endDay],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => {
      return param.split("_");
    });
    sortFilter = sortFilters;
  }

  try {
    console.log(customFilter);

    const flights = await flightRepo.getAllFlights(customFilter, sortFilter);
    if (flights.length === 0) {
      throw new AppError("No Flights found", StatusCodes.NOT_FOUND);
    }
    return flights;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) throw error;

    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  destroyFlight,
  getAllFlights,
};
