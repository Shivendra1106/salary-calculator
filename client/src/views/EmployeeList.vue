<template>
  <div>
    <h1>Employees</h1>
    <table class="table">
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
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.daily_rate }}</td>
          <td>
            <button @click="viewAttendance(employee.id)">View Attendance</button>
            <button @click="calculateSalary(employee.id)">Calculate Salary</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: []
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    viewAttendance(employeeId) {
      this.$router.push(`/attendance/${employeeId}`);
    },
    calculateSalary(employeeId) {
      this.$router.push(`/salary/${employeeId}`);
    }
  }
};
</script>