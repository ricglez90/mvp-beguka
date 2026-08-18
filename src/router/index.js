import { createRouter, createWebHistory } from 'vue-router'
import LeadCapture from '../views/LeadCapture.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/LeadCapture.vue')
  },
  {
    path: '/upsell',
    name: 'upsell',
    component: () => import('../views/SalesPage.vue')
  },
  {
    path: '/mock-checkout',
    name: 'mock-checkout',
    component: () => import('../views/MockCheckout.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/SuccessPage.vue')
  }
]
})

export default router