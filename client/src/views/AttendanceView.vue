<template>
  <div>
    <h1>Attendance for Employee {{ employeeId }}</h1>
    <div v-for="record in attendance" :key="record.id">
      <p>Date: {{ record.date }}, Hours: {{ record.hours_worked }}, Status: {{ record.status }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['employeeId'],
  data() {
    return {
      attendance: []
    };
  },
  created() {
    this.fetchAttendance();
  },
  methods: {
    async fetchAttendance() {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/${this.employeeId}`);
        this.attendance = response.data;
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    }
  }
};
</script>