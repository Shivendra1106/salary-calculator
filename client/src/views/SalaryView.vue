<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Salary Details</h2>

    <div v-if="salary">
      <p><b>Employee:</b> {{ salary.name }} ({{ salary.position }})</p>
      <p><b>Month:</b> {{ salary.month }}</p>
      <p><b>Total Days Worked:</b> {{ salary.total_days }}</p>
      <p><b>Total Hours Worked:</b> {{ salary.total_hours }}</p>
      <p><b>Daily Rate:</b> ₹{{ salary.daily_rate }}</p>
      <p><b>Gross Salary:</b> ₹{{ salary.gross_salary }}</p>
      <p><b>Deductions:</b> ₹{{ salary.deductions }}</p>
      <p><b>Net Salary:</b> ₹{{ salary.net_salary }}</p>
      <p><b>Paid:</b> {{ salary.paid ? "Yes" : "No" }}</p>
    </div>

    <div v-else>
      <p>Loading salary details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const salary = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/salaries/${route.params.employeeId}/calculate`);
    salary.value = res.data;
  } catch (err) {
    console.error("Error fetching salary:", err);
  }
});
</script>
