const Sequelize = require("sequelize");

const sequelize = new Sequelize("booking_appointment", "root", "54321", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
