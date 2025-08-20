// server/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
// const { Employee } = require('../models'); // adjust path to your models
const Employee = require('../models/Employee');
 
// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});
 
module.exports = router;