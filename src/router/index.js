import { createRouter, createWebHistory } from 'vue-router'
import ComingSoon from '../views/ComingSoon.vue'
import LeadCapture from '../views/LeadCapture.vue'
import SalesPage from '../views/SalesPage.vue'
import MockCheckout from '../views/MockCheckout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ComingSoon
    },
    {
      // Esta es la nueva URL que compartirás en tus redes sociales
      path: '/guia-gratis', 
      name: 'capture',
      component: LeadCapture
    },
    {
      path: '/upsell',
      name: 'upsell',
      component: SalesPage
    },
    {
      path: '/mock-checkout',
      name: 'mock-checkout',
      component: MockCheckout
    }
  ]
})

export default router