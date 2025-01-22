// src/router/index.js
import { createRouter,createWebHistory } from 'vue-router'
import DashBoards from '@/components/Dashboards.vue'
import MyTransactions from '@/components/transactions.vue'
import MyClients from '@/components/clients.vue'
import AllSites from '@/components/sites.vue'
import MySite from '@/components/site.vue'
import MyRdv from '@/components/appointments.vue'

const routes= [
    { path: '/', name: 'Home', component: DashBoards},
    { path: '/transactions', name: 'MyTransactions', component: MyTransactions},
    { path: '/clients', name: 'MyClients', component: MyClients},
    { path: '/sites', name: 'sites', component: AllSites},
    { path: '/site/:propId', name: 'site', component: MySite},
    { path: '/appointments', name: 'rdv', component: MyRdv}
]
const router =createRouter({
    history: createWebHistory(),
    routes
})
export default router