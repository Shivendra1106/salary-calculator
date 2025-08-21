const express = require("express");
const Salary = require("../models/salary");
const router = express.Router();
const db = require('../config/database');
// Get salary by employeeId
router.get("/:employeeId", async (req, res) => {
  try {
    const salary = await Salary.findOne({ where: { employeeId: req.params.employeeId } });
    if (!salary) return res.status(404).json({ error: "Salary not found" });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router