const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // database name
  process.env.DB_USER,    // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false // optional, disable SQL logging
  }
);

module.exports = sequelize;
