const express = require("express");
const Attendance = require("../models/attendance");
const router = express.Router();

// Get attendance by employeeId
router.get("/:employeeId", async (req, res) => {
  try {
    const attendance = await Attendance.findAll({ where: { employeeId: req.params.employeeId } });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
