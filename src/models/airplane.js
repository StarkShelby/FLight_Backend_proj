"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }
  Airplane.init(
    {
      flightName: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      boardingTime: DATE,
    },
    {
      sequelize,
      modelName: "Airplane",
    },
  );
  return Airplane;
};
