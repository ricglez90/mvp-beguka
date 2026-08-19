<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const route = useRoute()
const router = useRouter()

const leadId = ref(null)
const productId = ref(null)
const isProcessing = ref(false)
const errorMessage = ref('')

const leadEmail = ref(null)


onMounted(() => {
  leadEmail.value = route.query.email
  productId.value = route.query.product
  
  if (!leadEmail.value) {
    router.push({ name: 'capture' })
  }
})

const processMockPayment = async (status) => {
  isProcessing.value = true
  errorMessage.value = ''

  try {
    if (status === 'failed') {
      throw new Error('El banco simulado rechazó la tarjeta. Intenta con otro método.')
    }

    // Insertamos la orden de compra exitosa en Supabase
    const { error } = await supabase
        .from('orders')
        .insert([
            { 
            lead_email: leadEmail.value,    // <-- Empata con tu esquema
            product_id: productId.value,    // <-- Empata con tu esquema
            status: 'paid' 
            }
        ])
    if (error) throw error

    // Redirección a la página de éxito
    router.push({ name: 'success' })

  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="checkout-container">
      <div class="checkout-header">
        <h2>🔒 Pago Seguro (Modo Prueba)</h2>
        <p>Estás en un entorno de simulación.</p>
      </div>

      <div class="order-summary">
        <div class="summary-row">
          <span>Producto:</span>
          <strong>Guía Práctica de Intervención</strong>
        </div>
        <div class="summary-row total">
          <span>Total a pagar:</span>
          <strong>$15.00 USD</strong>
        </div>
      </div>

      <div class="action-buttons">
        <button 
          @click="processMockPayment('paid')" 
          :disabled="isProcessing" 
          class="btn-success">
          {{ isProcessing ? 'Procesando...' : 'Simular Pago Exitoso' }}
        </button>

        <button 
          @click="processMockPayment('failed')" 
          :disabled="isProcessing" 
          class="btn-danger">
          Simular Pago Rechazado
        </button>
      </div>

      <div v-if="errorMessage" class="error-container">
        <p class="error-msg">{{ errorMessage }}</p>
      </div>
      
      <button @click="router.push('/')" class="cancel-link" :disabled="isProcessing">
        Cancelar y volver al inicio
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
  background-color: var(--c-dark); /* Fondo oscuro para dar sensación de cambio de plataforma */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 1rem;
}

.checkout-container {
  width: 100%;
  max-width: 450px;
  background-color: var(--c-light);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

.checkout-header {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--c-dark);
}

.checkout-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--c-blue);
}

.order-summary {
  background-color: white;
  border: 1px solid rgba(7, 0, 44, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--c-dark);
}

.summary-row.total {
  margin-bottom: 0;
  padding-top: 1rem;
  border-top: 2px dashed rgba(7, 0, 44, 0.2);
  font-size: 1.2rem;
  color: var(--c-purple);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

button {
  width: 100%;
  padding: 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-success {
  background-color: var(--c-green);
  color: var(--c-dark);
  box-shadow: 0 4px 12px rgba(137, 203, 114, 0.4);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.btn-danger {
  background-color: transparent;
  border: 2px solid var(--c-red);
  color: var(--c-red);
}

.btn-danger:hover:not(:disabled) {
  background-color: rgba(238, 68, 77, 0.1);
}

.error-container {
  background-color: rgba(238, 68, 77, 0.1);
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.error-msg {
  color: var(--c-red);
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
}

.cancel-link {
  background: none;
  border: none;
  color: #666;
  text-decoration: underline;
  padding: 0.5rem;
  box-shadow: none;
  font-size: 0.9rem;
}

.cancel-link:hover {
  color: var(--c-dark);
}
</style>