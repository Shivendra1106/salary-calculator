const express = require('express');
const router = express.Router();

// Attendance route example
router.get('/:employeeId', (req, res) => {
    res.json({ message: `Attendance for employee ${req.params.employeeId}` });
});

module.exports = router;
