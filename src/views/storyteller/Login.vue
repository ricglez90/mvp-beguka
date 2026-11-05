<script setup>
import { ref } from 'vue'
import { supabaseStoryteller } from '@/services/supabaseStoryteller'

const email = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value) {
    errorMessage.value = 'Por favor, ingresa tu correo electrónico.'
    return
  }

  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const { error } = await supabaseStoryteller.auth.signInWithOtp({
      email: email.value,
      options: {
        // Asegura que al hacer clic en el correo, regresen a la ruta correcta
        emailRedirectTo: `${window.location.origin}/storyteller/start`
      }
    })

    if (error) throw error

    successMessage.value = '¡Enlace mágico enviado! Revisa tu bandeja de entrada (y la carpeta de spam) para entrar.'
    email.value = '' // Limpiamos el input
  } catch (error) {
    errorMessage.value = error.message || 'Ocurrió un error al enviar el enlace. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">Bienvenido al Portal</h2>
      <p class="subtitle">Ingresa sin contraseñas. Te enviaremos un enlace mágico para entrar al instante.</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="papa@ejemplo.com" 
            required 
            :disabled="loading"
          />
        </div>

        <!-- NUEVO: Checkbox de consentimiento -->
        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="human-check" 
            v-model="isHuman" 
            :disabled="loading"
          />
          <label for="human-check">
            Soy humano, entiendo que esta es una herramienta de apoyo y acepto usar este portal.
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Enviando enlace...' : 'Enviar enlace mágico' }}
        </button>
      </form>

      <!-- Mensajes de retroalimentación -->
      <div v-if="successMessage" class="message success">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="message error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100%;
}

.login-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.4;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}

.input-group input {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #4A90E2;
}

.input-group input:disabled {
  background-color: #f5f5f5;
  color: #999;
}

/* Estilos del checkbox */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  text-align: left;
  padding: 0.5rem 0;
}
.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-top: 0.1rem;
  accent-color: #4A90E2;
  cursor: pointer;
}
.checkbox-group label {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
  cursor: pointer;
}

.submit-btn {
  background-color: #4A90E2;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #357ABD;
}

.submit-btn:disabled {
  background-color: #A0C4E8;
  cursor: not-allowed;
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.message.success {
  background-color: #E8F5E9;
  color: #2E7D32;
  border: 1px solid #C8E6C9;
}

.message.error {
  background-color: #FFEBEE;
  color: #C62828;
  border: 1px solid #FFCDD2;
}
</style>