const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all employees
router.get('/', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch employees' });
        res.json(results);
    });
});

// Get single employee
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM employees WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch employee' });
        if (result.length === 0) return res.status(404).json({ error: 'Employee not found' });
        res.json(result[0]);
    });
});

module.exports = router;
