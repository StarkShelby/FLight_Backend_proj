const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateCreate(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.messagae = "Something went wrong while creating Flight";
    ErrorResponse.error = {
      explanation: "FlightNumber is not getting in the incoming request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreate,
};
