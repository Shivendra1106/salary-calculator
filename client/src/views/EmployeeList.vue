<template>
  <div>
    <h1>Employee List</h1>
    <table border="1" cellpadding="5">
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
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.daily_rate }}</td>
          <td>
            <button @click="getAttendance(emp.id)">Attendance</button>
            <button @click="getSalary(emp.id)">Salary</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employees: []
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:8084/api/employees");
      this.employees = res.data;
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  },
  methods: {
    async getAttendance(empId) {
      try {
        const res = await axios.get(`http://localhost:8084/api/attendance/${empId}`);
        console.log("Attendance Data:", res.data);
        this.$router.push(`/attendance/${empId}`);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    },
    async getSalary(empId) {
      try {
        const res = await axios.get(`http://localhost:8084/api/salary/${empId}`);
        console.log("Salary Data:", res.data);
        this.$router.push(`/salary/${empId}`);
      } catch (err) {
        console.error("Error fetching salary:", err);
      }
    }
  }
};
</script>
