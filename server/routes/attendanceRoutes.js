const express = require("express");
const router = express.Router();

const db = require("../config/database");

// GET all attendance records
router.get("/", (req, res) => {
  console.log("📥 GET /api/attendance called");
  const sql = `
    SELECT a.*, e.name as employee_name 
    FROM attendance a 
    LEFT JOIN employees e ON a.employee_id = e.id 
    ORDER BY a.date DESC, a.employee_id
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`✅ Found ${results.length} attendance records`);
    res.json(results);
  });
});

// GET attendance for specific employee
router.get("/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  console.log(`📥 GET /api/attendance/employee/${employeeId} called`);
  
  // Validate employee ID
  if (isNaN(employeeId)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const sql = `
    SELECT a.*, e.name as employee_name 
    FROM attendance a 
    LEFT JOIN employees e ON a.employee_id = e.id 
    WHERE a.employee_id = ? 
    ORDER BY a.date DESC
  `;
  
  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching employee attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`✅ Found ${results.length} attendance records for employee ${employeeId}`);
    res.json(results);
  });
});

// POST - Add new attendance record
router.post("/", (req, res) => {
  console.log("📝 POST /api/attendance called with:", req.body);
  const { employee_id, hours_worked, date, status } = req.body;
  
  // Validation
  if (!employee_id || !hours_worked || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(employee_id)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const sql = `
    INSERT INTO attendance (employee_id, hours_worked, date, status) 
    VALUES (?, ?, ?, ?)
  `;
  
  db.query(sql, [employee_id, hours_worked, date, status], (err, result) => {
    if (err) {
      console.error("❌ Error adding attendance record:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("✅ Attendance record added with ID:", result.insertId);
    res.json({ 
      id: result.insertId, 
      employee_id, 
      hours_worked, 
      date, 
      status,
      message: "Attendance record added successfully" 
    });
  });
});

// PUT - Update attendance record
router.put("/:id", (req, res) => {
  const recordId = req.params.id;
  console.log(`✏️ PUT /api/attendance/${recordId} called with:`, req.body);
  const { hours_worked, date, status } = req.body;
  
  // Validation
  if (!hours_worked || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE attendance 
    SET hours_worked = ?, date = ?, status = ? 
    WHERE id = ?
  `;
  
  db.query(sql, [hours_worked, date, status, recordId], (err, result) => {
    if (err) {
      console.error("❌ Error updating attendance record:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    console.log("✅ Attendance record updated with ID:", recordId);
    res.json({ 
      id: recordId, 
      hours_worked, 
      date, 
      status,
      message: "Attendance record updated successfully" 
    });
  });
});

// DELETE - Remove attendance record
router.delete("/:id", (req, res) => {
  const recordId = req.params.id;
  console.log(`🗑️ DELETE /api/attendance/${recordId} called`);
  
  if (isNaN(recordId)) {
    return res.status(400).json({ error: "Invalid record ID" });
  }

  const sql = "DELETE FROM attendance WHERE id = ?";
  
  db.query(sql, [recordId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting attendance record:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    console.log("✅ Attendance record deleted with ID:", recordId);
    res.json({ message: "Attendance record deleted successfully" });
  });
});

module.exports = router;