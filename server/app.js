const express = require("express");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const attendanceRouter = require("./routes/attendanceRoutes"); // ✅ Make sure this is included

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", employeesRouter);
app.use("/api/attendance", attendanceRouter); // ✅ This line should be present


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
  console.log('Server is starting...');