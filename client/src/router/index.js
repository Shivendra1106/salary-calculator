// client/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AttendanceView from '../views/AttendanceView.vue';
import EmployeeList from '../views/EmployeeList.vue';
import SalaryView from '../views/SalaryView.vue';
 
const routes = [
  {
    path: '/',
    name: 'Employees',
    component: EmployeeList
  },
  {
    path: '/attendance/:employeeId',
    name: 'Attendance',
    component: AttendanceView,
    props: true
  },
  {
  path: '/salary/:employeeId',
  name: 'Salary',
  component: () => import('../views/SalaryView.vue'),
  props: true
}

    
];
 
const router = createRouter({
  history: createWebHistory(),
  routes
});
 
export default router;
 
 