const { CrudRepo } = require("./crud-repo");
const { Flight } = require("../models");
class FlightRepo extends CrudRepo {
  constructor() {
    console.log("Flight Repo Hit");
    super(Flight);
  }
}

module.exports = FlightRepo;
