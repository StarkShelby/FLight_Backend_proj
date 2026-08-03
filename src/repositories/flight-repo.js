const { CrudRepo } = require("./crud-repo");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
class FlightRepo extends CrudRepo {
  constructor() {
    console.log("Flight Repo Hit");
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    console.log("Repository filter:", filter);
    const response = await Flight.findAll({
      where: filter,
      logging: console.log,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport_Details",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport_Details.code"),
            ),
          },
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport_Details",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport_Details.code"),
            ),
          },
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true, transaction) {
    const flight = await Flight.findByPk(flightId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!flight) {
      throw new Error("Flight is not present mate!");
    }
    if (+dec) {
      await flight.decrement("totalSeats", {
        by: seats,
        transaction,
      });
    } else {
      await flight.increment("totalSeats", {
        by: seats,
        transaction,
      });
    }
    await flight.reload({ transaction });
    return flight;
  }
}

module.exports = FlightRepo;
