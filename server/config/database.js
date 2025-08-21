const { Sequelize } = require('sequelize');
 
const sequelize = new Sequelize(
  process.env.DB_NAME || 'salary_calculator',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Shivendra@11',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
);
 
module.exports = sequelize;