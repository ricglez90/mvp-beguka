import { createRouter, createWebHistory } from 'vue-router'
// import ComingSoon from '../views/ComingSoon.vue'
import Home  from '@/views/Home.vue'
import LeadCapture from '../views/LeadCapture.vue'
import SalesPage from '../views/SalesPage.vue'
import MockCheckout from '../views/MockCheckout.vue'

import { supabaseStoryteller } from '../services/supabaseStoryteller'


// Importaciones para Storyteller
import StorytellerLayout from '../views/storyteller/StorytellerLayout.vue'
import StorytellerLogin from '../views/storyteller/Login.vue'
import StorytellerStart from '../views/storyteller/Start.vue'
import StorytellerAdmin from '../views/storyteller/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    },

    // --- RUTAS DEL PORTAL DE HISTORIAS ---
  {
      path: '/storyteller',
      component: StorytellerLayout,
      children: [
        { path: '', redirect: '/storyteller/start' },
        { 
          path: 'login', 
          name: 'StorytellerLogin', 
          component: StorytellerLogin,
          meta: { requiresGuest: true } // Solo para usuarios SIN sesión
        },
        { 
          path: 'start', 
          name: 'StorytellerStart', 
          component: StorytellerStart,
          meta: { requiresAuth: true } // Protegida
        },
        { 
          path: 'admin', 
          name: 'StorytellerAdmin', 
          component: StorytellerAdmin,
          meta: { requiresAuth: true, requiresAdmin: true } // Doble protección
        }
      ]
    }
  ]
})

// === NAVIGATION GUARD ===
router.beforeEach(async (to, from, next) => {
  // 1. Consultar el estado actual de la sesión directamente al servidor local de Supabase
  const { data: { session } } = await supabaseStoryteller.auth.getSession()

  // 2. Verificar qué tipo de protección requiere la ruta destino
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  // 3. Lógica de control de acceso
  if (requiresAuth && !session) {
    // Intenta entrar a Start/Admin sin sesión -> Redirigir a Login
    next({ name: 'StorytellerLogin' })
  } else if (requiresGuest && session) {
    // Intenta entrar a Login pero ya tiene sesión -> Redirigir a Start
    next({ name: 'StorytellerStart' })
  } else {
    // Si cumple las reglas, permitir el paso
    next()
  }
})

export default router