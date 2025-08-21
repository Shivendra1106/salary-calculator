// server/models/attendance.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path

const Attendance = sequelize.define("Attendance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  hours_worked: { type: DataTypes.FLOAT, allowNull: true }
}, {
  tableName: "attendance",
  timestamps: false
});

module.exports = Attendance;
