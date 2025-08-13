const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  daily_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Employee;