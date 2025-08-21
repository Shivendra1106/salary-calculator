const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // <-- Make sure this line is present

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
}, {
  timestamps: false // Optional: disable createdAt/updatedAt if not in DB
});

module.exports = Employee;
