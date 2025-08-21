const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all employees (existing - keep this)
router.get("/", (req, res) => {
  console.log("📥 GET /api/employees called");
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("❌ Error fetching employees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`✅ Found ${results.length} employees`);
    res.json(results);
  });
});

// POST new employee (existing - keep this)
router.post("/", (req, res) => {
  console.log("📩 POST /api/employees called with:", req.body);
  const { name, position, daily_rate } = req.body;
  
  if (!name || !position || !daily_rate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO employees (name, position, daily_rate) VALUES (?, ?, ?)";
  db.query(sql, [name, position, daily_rate], (err, result) => {
    if (err) {
      console.error("❌ Error inserting employee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("✅ Employee inserted with ID:", result.insertId);
    res.json({ 
      id: result.insertId, 
      name, 
      position, 
      daily_rate,
      message: "Employee added successfully" 
    });
  });
});

// ✅ NEW: UPDATE employee
router.put("/:id", (req, res) => {
  console.log("✏️ PUT /api/employees called for ID:", req.params.id, "with:", req.body);
  const { name, position, daily_rate } = req.body;
  const employeeId = req.params.id;
  
  if (!name || !position || !daily_rate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE employees SET name = ?, position = ?, daily_rate = ? WHERE id = ?";
  db.query(sql, [name, position, daily_rate, employeeId], (err, result) => {
    if (err) {
      console.error("❌ Error updating employee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    console.log("✅ Employee updated with ID:", employeeId);
    res.json({ 
      id: employeeId, 
      name, 
      position, 
      daily_rate,
      message: "Employee updated successfully" 
    });
  });
});

// ✅ NEW: DELETE employee
router.delete("/:id", (req, res) => {
  const employeeId = req.params.id;
  console.log("🗑️ DELETE /api/employees called for ID:", employeeId);
  
  db.query("DELETE FROM employees WHERE id = ?", [employeeId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting employee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    console.log("✅ Employee deleted with ID:", employeeId);
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = router;