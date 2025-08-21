const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get attendance for an employee
router.get('/:employeeId', (req, res) => {
    const { employeeId } = req.params;
    db.query(
        'SELECT * FROM attendance WHERE employee_id = ?',
        [employeeId],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch attendance' });
            res.json(results);
        }
    );
});

// Add attendance record
router.post('/', (req, res) => {
    const { employee_id, date, hours_worked, status } = req.body;
    db.query(
        'INSERT INTO attendance (employee_id, date, hours_worked, status) VALUES (?, ?, ?, ?)',
        [employee_id, date, hours_worked, status],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Failed to add attendance' });
            res.json({ message: 'Attendance added', id: result.insertId });
        }
    );
});

module.exports = router;
