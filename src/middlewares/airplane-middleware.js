const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateCreate(req, res, next) {
  if (!req.body.flightName) {
    ErrorResponse.messagae = "Something went wrong while creating Airplane";
    ErrorResponse.error = {
      explanation: "flightName not getting in the incoming request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreate,
};
