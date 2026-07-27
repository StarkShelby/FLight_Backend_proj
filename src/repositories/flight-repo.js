const { CrudRepo } = require("./crud-repo");
const { Flight } = require("../models");
class FlightRepo extends CrudRepo {
  constructor() {
    console.log("Flight Repo Hit");
    super(Flight);
  }

  async getAllFlights(filter) {
    console.log("Repository filter:", filter);
    const response = await Flight.findAll({
      where: filter,
      logging: console.log,
    });
    return response;
  }
}

module.exports = FlightRepo;
