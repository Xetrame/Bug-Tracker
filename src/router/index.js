import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import TicketCreateView from '@/views/TicketCreateView.vue'
import TicketDetailView from '@/views/TicketDetailView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/tickets/new', name: 'ticket.create', component: TicketCreateView },
    { path: '/tickets/:id(\\d+)', name: 'ticket.show', component: TicketDetailView, props: true },
    { path: '/:pathMatch(.*)*', redirect: { name: 'dashboard' } },
  ],
})