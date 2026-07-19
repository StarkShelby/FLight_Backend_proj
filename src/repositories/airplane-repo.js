const { CrudRepo } = require("./crud-repo");
const { Flights } = require("../models");
class AirplaneRepo extends CrudRepo {
  constructor() {
    console.log("repo HIt");
    super(Flights);
  }
}
module.exports = AirplaneRepo;
