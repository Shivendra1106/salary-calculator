<template>
  <div>
    <h2>Employees</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Position</th><th>Daily Rate</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.daily_rate }}</td>
          <td>
            <button @click="viewAttendance(emp.id)">View Attendance</button>
            <button @click="calculateSalary(emp.id)">Calculate Salary</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const employees = ref([]);
const router = useRouter();

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/employees");
  employees.value = res.data;
});

function viewAttendance(id) {
  router.push(`/attendance/${id}`);
}

function calculateSalary(id) {
  router.push(`/salary/${id}`);
}
</script>
