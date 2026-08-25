<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const leadEmail = ref(null)
const isLoading = ref(false)

onMounted(() => {
  leadEmail.value = route.query.email
  if (!leadEmail.value) {
    router.push({ name: 'capture' })
  }
})

const initiateCheckout = () => {
  isLoading.value = true
  
  setTimeout(() => {
    router.push({ 
      name: 'mock-checkout', 
      query: { 
        email: leadEmail.value,
        product: 'manual-crianza-v1' 
      } 
    })
  }, 800)
}
</script>

<template>
  <div class="page-wrapper">
    <div class="sales-container">
      <div class="success-banner">
        🎁 ¡Éxito! Tu material gratuito va en camino a tu correo.
      </div>
      
      <div class="presale-badge">Lanzamiento Oficial: Próximamente</div>
      
      <h2>Muy pronto: Guía Completa</h2>
      
      <p class="pitch">
        El material que acabas de pedir te dará las bases, pero nuestra <strong>Guía Práctica Completa</strong> te dará el plan paso a paso. 
        Actualmente estamos dando los últimos toques a la versión final.
      </p>

      <div class="product-card">
        <div class="product-info">
          <h3>¿Qué incluirá la versión completa?</h3>
          <ul class="benefits">
            <li>✓ Ejercicios prácticos para seguir durante 10 semanas</li>
            <li>✓ Manual de padres para el seguimiento</li>
            <li>✓ Formatos disponibles: Color y Coloreable (B/N)</li>
            <!-- <li>✓ Acceso anticipado antes que el público general</li> -->
          </ul>
        </div>
        
        <!-- <div class="urgency-box">
          <p><strong>Oferta exclusiva de preventa:</strong></p>
          <div class="price-tag">
            <span class="original-price">$30 USD</span>
            <span class="discount-price">$15 USD</span>
          </div>
        </div> -->
      </div>



     <button @click="router.push({ name: 'capture' })" class="decline-button" :disabled="isLoading">
      No gracias, me conformo con el material gratuito por ahora
    </button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  --c-dark: #07002C;
  --c-light: #fffae4;
  --c-red: #ee444d;
  --c-yellow: #f8bb4a;
  --c-green: #89cb72;
  --c-blue: #00abf3;
  --c-purple: #8d3bc6;

  min-height: 100vh;
  background-color: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--c-dark);
  padding: 1rem;
}

.sales-container {
  width: 100%;
  max-width: 550px;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(7, 0, 44, 0.1);
  text-align: center;
  border-top: 5px solid var(--c-yellow);
}

.success-banner {
  background-color: rgba(137, 203, 114, 0.15);
  color: #2b6118;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 2rem;
  border: 1px solid var(--c-green);
}

.presale-badge {
  display: inline-block;
  background-color: var(--c-purple);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  color: var(--c-dark);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

.pitch {
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: #4a4a4a;
}

.product-card {
  border: 2px solid rgba(7, 0, 44, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  text-align: left;
}

.product-info {
  padding: 1.5rem;
  background-color: rgba(0, 171, 243, 0.03);
}

.product-info h3 {
  margin-top: 0;
  color: var(--c-blue);
}

.benefits {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.benefits li {
  margin-bottom: 0.6rem;
  font-weight: 500;
  color: var(--c-dark);
}

.urgency-box {
  background-color: rgba(248, 187, 74, 0.15);
  padding: 1.5rem;
  border-top: 2px solid rgba(248, 187, 74, 0.3);
  text-align: center;
}

.urgency-box p {
  margin: 0 0 0.5rem 0;
  color: var(--c-dark);
}

.price-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.original-price {
  text-decoration: line-through;
  color: var(--c-red);
  font-size: 1.2rem;
  font-weight: 600;
}

.discount-price {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--c-dark);
}

.buy-button {
  width: 100%;
  padding: 1.2rem;
  background-color: var(--c-yellow);
  color: var(--c-dark);
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.1s;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(248, 187, 74, 0.4);
}

.buy-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background-color: #f6ad2b;
}

.buy-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.decline-button {
  background: none;
  border: none;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}

.decline-button:hover {
  color: var(--c-dark);
}
</style>