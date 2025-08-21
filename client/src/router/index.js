import AttendanceView from "@/views/AttendanceView.vue";
import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from "../views/EmployeeList.vue";
import SalaryView from "../views/SalaryView.vue";

const routes = [
  { path: "/", name: "EmployeeList", component: EmployeeList },
  { path: "/attendance", name: "Attendance", component: AttendanceView },
  { path: "/attendance/:id", name: "AttendanceList", component: AttendanceView, props: true },
  { path: "/salary/:id", name: "SalaryView", component: SalaryView, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});