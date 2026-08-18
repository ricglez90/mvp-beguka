<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  website: '', 
  isHuman: false
})

const isLoading = ref(false)
const errorMessage = ref('')

const submitLead = async () => {
  errorMessage.value = ''
  
  if (form.value.website !== '') {
    console.warn('Bot detectado')
    return
  }

  if (!form.value.isHuman) {
    errorMessage.value = 'Por favor, confirma que eres humano.'
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { full_name: form.value.name, email: form.value.email }
      ])
      .select()

    if (error) {
      if (error.code === '23505') throw new Error('Este correo ya descargó la guía.')
      throw error
    }

    // Usamos directamente el correo que el usuario escribió en el formulario
    router.push({ name: 'upsell', query: { email: form.value.email } })

  } catch (error) {
    errorMessage.value = error.message || 'Ocurrió un error al procesar tu solicitud.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="capture-container">
      <h1>Descarga la Guía Gratuita</h1>
      <p class="subtitle">Ingresa tus datos para recibir el material directamente en tu correo.</p>

      <form @submit.prevent="submitLead" class="lead-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input v-model="form.name" type="text" id="name" required placeholder="Tu nombre" />
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input v-model="form.email" type="email" id="email" required placeholder="tu@correo.com" />
        </div>

        <div class="honey-trap" aria-hidden="true">
          <label for="website">No llenes este campo si eres humano</label>
          <input v-model="form.website" type="text" id="website" tabindex="-1" autocomplete="off" />
        </div>

        <div class="form-group checkbox-group">
          <input v-model="form.isHuman" type="checkbox" id="human-check" />
          <label for="human-check" class="human-label">Soy humano y acepto recibir la guía</label>
        </div>

        <div v-if="errorMessage" class="error-container">
          <p class="error-msg">{{ errorMessage }}</p>
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Procesando...' : 'Obtener Guía Ahora' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Definición de la paleta de colores global para esta vista */
.page-wrapper {
  --c-dark: #07002C;
  --c-light: #fffae4;
  --c-red: #ee444d;
  --c-yellow: #f8bb4a;
  --c-green: #89cb72;
  --c-blue: #00abf3;
  --c-purple: #8d3bc6;

  min-height: 100vh;
  min-width: 600 px;
  background-color: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--c-dark);
}

.capture-container {
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(7, 0, 44, 0.1);
  border-top: 5px solid var(--c-purple); /* Acento visual en la tarjeta */
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--c-dark);
  text-align: center;
  font-weight: 800;
}

.subtitle {
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.4;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--c-dark);
}

input[type="text"], input[type="email"] {
  padding: 0.8rem 1rem;
  border: 1px solid rgba(7, 0, 44, 0.2);
  border-radius: 6px;
  font-size: 1rem;
  background-color: var(--c-light);
  color: var(--c-dark);
  transition: border-color 0.2s;
}

input[type="text"]:focus, input[type="email"]:focus {
  outline: none;
  border-color: var(--c-blue);
  box-shadow: 0 0 0 3px rgba(0, 171, 243, 0.1);
}

.checkbox-group {
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: rgba(137, 203, 114, 0.1); /* Fondo verde tenue para confianza */
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(137, 203, 114, 0.3);
}

.human-label {
  margin-bottom: 0;
  font-size: 0.85rem;
  line-height: 1.3;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-top: 0.15rem;
  cursor: pointer;
  accent-color: var(--c-green);
}

.honey-trap {
  position: absolute; 
  left: -9999px;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: var(--c-blue);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.2s;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 171, 243, 0.3);
}

button:hover:not(:disabled) {
  background-color: #0098d9;
  transform: translateY(-1px);
}

button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
  box-shadow: none;
}

.error-container {
  background-color: rgba(238, 68, 77, 0.1);
  border-left: 4px solid var(--c-red);
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error-msg {
  color: var(--c-red);
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
}
</style>