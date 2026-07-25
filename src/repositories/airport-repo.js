const { Airport } = require("../models");
const { CrudRepo } = require("./crud-repo");

class AirportRepo extends CrudRepo {
  constructor() {
    super(Airport);
  }
}
module.exports = AirportRepo;
