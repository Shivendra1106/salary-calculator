<template>
  <div class="attendance-container">
    <h1>Attendance Records</h1>
    <h2 v-if="$route.params.id">Employee ID: {{ $route.params.id }}</h2>
    <h2 v-else>All Employees</h2>
    
    <div v-if="loading">Loading attendance records...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    
    <div v-if="attendanceRecords.length > 0">
      <table class="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in attendanceRecords" :key="record.id">
            <td>{{ record.id }}</td>
            <td>{{ record.employee_name || 'Unknown' }}</td>
            <td>{{ record.employee_id }}</td>
            <td>{{ formatDate(record.date) }}</td>
            <td>{{ record.hours_worked }}</td>
            <td :class="getStatusClass(record.status)">{{ record.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading">
      No attendance records found.
    </div>

    <button @click="goBack" class="back-btn">← Back to Employee List</button>
  </div>
</template>

<script>
export default {
  name: "AttendanceView",
  data() {
    return {
      attendanceRecords: [],
      loading: false,
      error: ""
    };
  },
  methods: {
    async loadAttendance() {
      this.loading = true;
      this.error = "";
      try {
        let url = "http://localhost:5000/api/attendance";
        
        // Check if we're viewing a specific employee's attendance
        if (this.$route.params.id) {
          url = `http://localhost:5000/api/attendance/employee/${this.$route.params.id}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.attendanceRecords = await response.json();
        console.log("Attendance records loaded:", this.attendanceRecords);
      } catch (error) {
        console.error("❌ Error fetching attendance:", error);
        this.error = "Failed to load attendance records: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    
    getStatusClass(status) {
      return {
        'status-present': status === 'Present',
        'status-absent': status === 'Absent',
        'status-leave': status === 'Leave',
        'status-halfday': status === 'Half-day'
      };
    },
    
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.loadAttendance();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadAttendance();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.attendance-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.attendance-table th,
.attendance-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.attendance-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.status-present {
  color: #28a745;
  font-weight: bold;
}

.status-absent {
  color: #dc3545;
  font-weight: bold;
}

.status-leave {
  color: #ffc107;
  font-weight: bold;
}

.status-halfday {
  color: #17a2b8;
  font-weight: bold;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background: #5a6268;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
}
</style>