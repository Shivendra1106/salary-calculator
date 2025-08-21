const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Fetch salary from salaries table
router.get('/:employeeId', (req, res) => {
    const { employeeId } = req.params;

    db.query('SELECT * FROM salaries WHERE employee_id = ?', [employeeId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch salary' });

        if (result.length === 0) {
            // If salary not recorded yet, calculate it dynamically
            db.query('SELECT * FROM employees WHERE id = ?', [employeeId], (err, employeeRes) => {
                if (err || employeeRes.length === 0) {
                    return res.status(404).json({ error: 'Employee not found' });
                }
                const employee = employeeRes[0];

                db.query(
                    `SELECT COUNT(*) as total_days, SUM(hours_worked) as total_hours 
                     FROM attendance 
                     WHERE employee_id = ? AND status = 'Present'`,
                    [employeeId],
                    (err, attRes) => {
                        if (err) return res.status(500).json({ error: 'Failed to calculate salary' });

                        const { total_days, total_hours } = attRes[0];
                        const month = new Date().toISOString().slice(0, 7); // YYYY-MM
                        const gross_salary = total_days * employee.daily_rate;
                        const deductions = 0;
                        const net_salary = gross_salary - deductions;

                        res.json({
                            id: employee.id,
                            name: employee.name,
                            position: employee.position,
                            daily_rate: employee.daily_rate,
                            month,
                            total_days,
                            total_hours,
                            gross_salary,
                            deductions,
                            net_salary,
                            paid: false
                        });
                    }
                );
            });
        } else {
            res.json(result[0]); // existing salary record
        }
    });
});

module.exports = router;
