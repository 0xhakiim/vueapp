<template>
      <aside class="sidebar bg-white p-relative p20">
        <h3 class="p-relative txt-c m0">REM</h3>
          <ul>
          <li>
            <router-link class="active d-flex align-center fs-14 c-black rad-6 p10" to="/">
              <i class="fa-regular fa-chart-bar fa-fw"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-flex align-center fs-14 c-black rad-6 p10" to="/transactions">
              <i class="fas fa-arrows-left-right fa-fw"></i>
              <span>Transactions</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-flex align-center fs-14 c-black rad-6 p10" to="/clients">
              <i class="fas fa-users fa-fw"></i>
              <span>Clients</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sites" class=".a d-flex align-center fs-14 c-black rad-6 p10">
              <i class="fa-solid fa-house-flag fa-fw"></i>
              <span>Sites</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-flex align-center fs-14 c-black rad-6 p10" to="/orders">
              <i class="fa-solid fa-hourglass-half fa-fw"></i>
              <span>Pending Orders</span>
            </router-link>
          </li>
          <li>
            <router-link class="d-flex align-center fs-14 c-black rad-6 p10" to="/appointments">
              <i class="fa-solid fa-calendar-check fa-fw"></i>
              <span>Appointments</span>
            </router-link>
          </li>
        </ul>
      </aside>
</template>
<script>
import '../assets/framework.css'
export default {
  name: 'SideBar'
}
</script>
<style scoped>
.router-link-active {
  background-color: #f0f0f0;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  padding: 0;
}
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar-thumb {
  background-color: var(--blue-color);
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--blue-alt-color);
}
.page {
  background-color: #f1f5f9;
  min-height: 100vh;
}
/* Start Sidebar */
.sidebar {
  width: 250px;
  box-shadow: 0 0 10px #ddd;
}
.sidebar > h3{
  margin-bottom: 50px;
}
.sidebar h3:last-child {
  margin-right:20% ;
}
.sidebar > h3::before,
.sidebar > h3::after {
  content: "";
  background-color: black;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
}
.sidebar > h3::before {
  width: 80px;
  height: 2px;
  bottom: -20px;
}
.sidebar > h3::after {
  bottom: -25px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 4px solid white;
}
.sidebar ul li router-link {
  transition: 0.3s;
  margin: 10px;
  cursor: pointer;
}
.sidebar ul li router-link:hover,
.sidebar ul li router-link-active {
  background-color: #f0f0f0;
}
.sidebar ul li router-link span {
  font-size: 14px;
  margin-left: 10px;
}
</style>
