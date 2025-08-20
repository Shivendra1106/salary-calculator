const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Salary = sequelize.define("Salary", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  month: { type: DataTypes.STRING, allowNull: false },
  totalDays: { type: DataTypes.INTEGER, allowNull: false },
  grossSalary: { type: DataTypes.FLOAT, allowNull: false },
  deductions: { type: DataTypes.FLOAT, allowNull: false },
  netSalary: { type: DataTypes.FLOAT, allowNull: false },
  paid: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "salary",
  timestamps: false
});

module.exports = Salary;
