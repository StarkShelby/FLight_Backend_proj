"use strict";
const { Enums } = require("../utils/common");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enums.SEAT_TYPE;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 4,
        row: 1,
        col: "A",
        type: BUSINESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 2,
        row: 10,
        col: "C",
        type: PREMIUM_ECONOMY,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 3,
        row: 5,
        col: "B",
        type: PREMIUM_ECONOMY,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 3,
        row: 6,
        col: "C",
        type: PREMIUM_ECONOMY,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        col: "A",
        type: ECONOMY,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 1,
        col: "B",
        type: FIRST_CLASS,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 6,
        row: 2,
        col: "A",
        type: FIRST_CLASS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */
    await queryInterface.bulkDelete("Seats", null, {});
  },
};
