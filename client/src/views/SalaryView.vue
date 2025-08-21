<template>

  <div>
    <h1>Salary Details for Employee {{ $route.params.id }}</h1>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee ID</th>
          <th>Month</th>
          <th>Total Days</th>
          <th>Gross Salary</th>
          <th>Deductions</th>
          <th>Net Salary</th>
          <th>Paid</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salary in salaries" :key="salary.id">
          <td>{{ salary.id }}</td>
          <td>{{ salary.employee_id }}</td>
          <td>{{ salary.month }}</td>
          <td>{{ salary.total_days }}</td>
          <td>{{ salary.gross_salary }}</td>
          <td>{{ salary.deductions }}</td>
          <td>{{ salary.net_salary }}</td>
          <td>{{ salary.paid }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      salaries: []
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:5000/api/salary/${this.$route.params.id}`);
      this.salaries = res.data;
    } catch (err) {
      console.error("Error fetching salary:", err);
    }
  }
};
</script>
