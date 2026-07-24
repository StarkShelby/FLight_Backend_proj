const { CrudRepo } = require("./crud-repo");
const { Airplane } = require("../models");
class AirplaneRepo extends CrudRepo {
  constructor() {
    console.log("repo HIt");
    super(Airplane);
  }
}
module.exports = AirplaneRepo;
