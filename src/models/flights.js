'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flights.init({
    flightName: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    boardingTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};