const express = require("express");
const router = express.Router();
let employees = [{ id: 1, name: "Shivendra", role: "Developer", salary: 50000 }];

router.get("/", (req, res) => res.json(employees));
router.post("/", (req, res) => {
  const newEmp = { id: Date.now(), ...req.body };
  employees.push(newEmp);
  res.json(newEmp);
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  employees = employees.map(e => e.id === id ? { ...e, ...req.body } : e);
  res.json({ message: "Updated" });
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  employees = employees.filter(e => e.id !== id);
  res.json({ message: "Deleted" });
});
module.exports = router;
