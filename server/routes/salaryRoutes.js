const express = require('express');
const router = express.Router();

// Salary route example
router.get('/:employeeId', (req, res) => {
    res.json({ message: `Salary info for employee ${req.params.employeeId}` });
});

module.exports = router;
