<template>
  <div>
    <h1>Employee List</h1>

    <!-- Loading/Error Messages -->
    <div v-if="loading">Loading employees...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-if="successMessage" style="color: green;">{{ successMessage }}</div>

    <!-- Employee Table -->
    <table v-if="employees.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Daily Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>
            <span v-if="!emp.editing">{{ emp.name }}</span>
            <input v-else v-model="emp.editName" type="text" />
          </td>
          <td>
            <span v-if="!emp.editing">{{ emp.position }}</span>
            <input v-else v-model="emp.editPosition" type="text" />
          </td>
          <td>
            <span v-if="!emp.editing">{{ emp.daily_rate }}</span>
            <input v-else v-model="emp.editDailyRate" type="number" />
          </td>
          <td>
            <!-- Edit/Save Buttons -->
            <button v-if="!emp.editing" @click="startEdit(emp)" class="edit-btn">
              Edit
            </button>
            <div v-else>
              <button @click="saveEdit(emp)" class="save-btn">Save</button>
              <button @click="cancelEdit(emp)" class="cancel-btn">Cancel</button>
            </div>
            
            <!-- Delete Button -->
            <button @click="deleteEmployee(emp.id)" class="delete-btn" :disabled="emp.editing">
              Delete
            </button>

            <!-- ✅ ADDED: Attendance Button for each employee -->
            <button @click="showEmployeeAttendance(emp.id)" class="attendance-btn" :disabled="emp.editing">
              Attendance
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No employees found</div>

    <!-- Add Employee Form -->
    <h2>Add Employee</h2>
    <form @submit.prevent="addEmployee">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="text" v-model="position" placeholder="Position" required />
      <input type="number" v-model="daily_rate" placeholder="Daily Rate" required />
      <button type="submit" :disabled="adding">Add Employee</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EmployeeList",
  data() {
    return {
      employees: [],
      name: "",
      position: "",
      daily_rate: "",
      loading: false,
      adding: false,
      error: "",
      successMessage: ""
    };
  },
  methods: {
    async loadEmployees() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const employeeData = await response.json();
        // Add editing properties to each employee
        this.employees = employeeData.map(emp => ({
          ...emp,
          editing: false,
          editName: emp.name,
          editPosition: emp.position,
          editDailyRate: emp.daily_rate
        }));
        console.log("Employees loaded:", this.employees);
      } catch (error) {
        console.error("❌ Error fetching employees:", error);
        this.error = "Failed to load employees: " + error.message;
      } finally {
        this.loading = false;
      }
    },

    async addEmployee() {
      this.adding = true;
      this.error = "";
      this.successMessage = "";
      
      try {
        const response = await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            position: this.position,
            daily_rate: this.daily_rate
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        this.successMessage = result.message || "Employee added successfully!";
        
        // Reload the employee list
        await this.loadEmployees();
        
        // Reset form
        this.name = "";
        this.position = "";
        this.daily_rate = "";
      } catch (error) {
        console.error("❌ Error adding employee:", error);
        this.error = "Failed to add employee: " + error.message;
      } finally {
        this.adding = false;
      }
    },

    // Edit employee methods
    startEdit(employee) {
      employee.editing = true;
      // Create copies of the original values for editing
      employee.editName = employee.name;
      employee.editPosition = employee.position;
      employee.editDailyRate = employee.daily_rate;
    },

    cancelEdit(employee) {
      employee.editing = false;
    },

    async saveEdit(employee) {
      this.error = "";
      this.successMessage = "";
      
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employee.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: employee.editName,
            position: employee.editPosition,
            daily_rate: employee.editDailyRate
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        this.successMessage = result.message || "Employee updated successfully!";
        
        // Reload the employee list to get fresh data
        await this.loadEmployees();
      } catch (error) {
        console.error("❌ Error updating employee:", error);
        this.error = "Failed to update employee: " + error.message;
        // Cancel edit on error
        employee.editing = false;
      }
    },

    // Delete employee
    async deleteEmployee(employeeId) {
      if (!confirm("Are you sure you want to delete this employee?")) {
        return;
      }

      this.error = "";
      this.successMessage = "";
      
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        this.successMessage = result.message || "Employee deleted successfully!";
        
        // Reload the employee list
        await this.loadEmployees();
      } catch (error) {
        console.error("❌ Error deleting employee:", error);
        this.error = "Failed to delete employee: " + error.message;
      }
    },

    // ✅ ADDED: Show Attendance for specific employee
    showEmployeeAttendance(employeeId) {
  this.$router.push({ name: 'AttendanceList', params: { id: employeeId } });
}
  },
  mounted() {
    this.loadEmployees();
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
h1, h2 {
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 30px;
}
table, th, td {
  border: 1px solid #ddd;
}
th, td {
  padding: 10px;
  text-align: left;
}
form {
  margin-top: 20px;
}
input {
  margin: 5px;
  padding: 8px;
}
button {
  padding: 8px 15px;
  margin: 2px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button[type="submit"] {
  background: #007bff;
  color: white;
}
button[type="submit"]:hover {
  background: #0056b3;
}
.edit-btn {
  background: #ffc107;
  color: black;
}
.edit-btn:hover {
  background: #e0a800;
}
.save-btn {
  background: #28a745;
  color: white;
}
.save-btn:hover {
  background: #218838;
}
.cancel-btn {
  background: #6c757d;
  color: white;
}
.cancel-btn:hover {
  background: #5a6268;
}
.delete-btn {
  background: #dc3545;
  color: white;
}
.delete-btn:hover {
  background: #c82333;
}

/* ✅ ADDED: Attendance button styles */
.attendance-btn {
  background: #17a2b8;
  color: white;
}

.attendance-btn:hover {
  background: #138496;
}
</style>