const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendance = sequelize.define("Attendance", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("Present", "Absent", "Leave"),
    allowNull: false
  }
});

module.exports = Attendance;
