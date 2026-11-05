<script setup>
import { ref } from 'vue'
import { supabaseStoryteller } from '@/services/supabaseStoryteller'

const childName = ref('')
const childAge = ref('')
const selectedTheme = ref('')
const useFantasy = ref(false) // NUEVO: Control de fantasía
const isGenerating = ref(false)
const outOfCredits = ref(false) // NUEVO: Control de saldo
const feedbackMessage = ref({ type: '', text: '' }) 

const showInstructions = ref(false) // NUEVO: Controla cuándo mostrar la guía

const digitalStory = ref(null)
const pdfBase64Data = ref(null)

const ageOptions = [
  { value: '3-5', label: '3 a 5 años (Preescolar)' },
  { value: '6-8', label: '6 a 8 años (Infantil)' },
  { value: '9-11', label: '9 a 11 años (Preadolescente)' },
  { value: '12-15', label: '12 a 15 años (Adolescente)' }
]

const themeOptions = [
  { value: 'miedo_oscuridad', label: '🌙 Vencer el miedo a la oscuridad' },
  { value: 'empatia_hermanos', label: '🤝 Empatía y conflictos entre hermanos' },
  { value: 'responsabilidad', label: '🧹 Ayudar en casa (Responsabilidad)' },
  { value: 'honestidad', label: '🗣️ Decir la verdad (Honestidad)' },
  { value: 'autoestima', label: '⭐ Autoestima y confianza en sí mismo' },
  { value: 'paciencia', label: '🧘‍♀️ Tener paciencia y control de emociones' }
]

const handleGenerate = async () => {
  if (!childName.value || !childAge.value || !selectedTheme.value) return

  try {
  isGenerating.value = true
  outOfCredits.value = false
  showInstructions.value = false
  digitalStory.value = null // Limpiamos lecturas anteriores
  feedbackMessage.value = { type: '', text: '' }
  
  const { data: { session } } = await supabaseStoryteller.auth.getSession()
  if (!session) throw new Error('Debes iniciar sesión')

  const payload = { nombre: childName.value, edad: childAge.value, tema: selectedTheme.value, usaFantasia: useFantasy.value }
  
  const respuesta = await fetch('${import.meta.env.VITE_API_URL}/api/generar-cuento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
    body: JSON.stringify(payload)
  })

  if (!respuesta.ok) {
    const errorData = await respuesta.json()
    if (respuesta.status === 403) outOfCredits.value = true
    throw new Error(errorData.error || 'Error del servidor')
  }
  
  // ¡AHORA RECIBIMOS JSON!
  const data = await respuesta.json()
  
  // Guardamos los datos para la Vista Digital
  digitalStory.value = data.cuento
  pdfBase64Data.value = data.pdfBase64

  feedbackMessage.value = { type: 'success', text: `¡Cuento generado! Léelo aquí o descarga el imprimible.` }

  } catch (error) {
    feedbackMessage.value = { type: 'error', text: error.message }
  } finally {
    isGenerating.value = false
  }
}

const downloadPDF = async () => {
  if (!pdfBase64Data.value) return
  
  try {
    // Truco moderno: Usamos fetch para convertir el Base64 a Blob automáticamente
    // sin usar atob() ni ciclos manuales
    const respuesta = await fetch(`data:application/pdf;base64,${pdfBase64Data.value}`)
    const blob = await respuesta.blob()
    
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Cuento-magico-${childName.value}.pdf`)
    document.body.appendChild(link)
    link.click()
    
    // Limpieza de memoria
    link.remove()
    window.URL.revokeObjectURL(downloadUrl)
    
    // Mostramos las instrucciones solo cuando descargan el impreso
    showInstructions.value = true 

  } catch (error) {
    console.error("Error al decodificar el PDF:", error)
    feedbackMessage.value = { 
      type: 'error', 
      text: 'Ocurrió un error al descargar el archivo. Por favor, intenta de nuevo.' 
    }
  }
}
const resetForm = () => {
  digitalStory.value = null
  childName.value = ''
  feedbackMessage.value = { type: '', text: '' }
  showInstructions.value = false
}

// Función placeholder para el Grupo 3 (Solicitar créditos)
const handleRequestCredits = async () => {
  try {
    const { data: { session } } = await supabaseStoryteller.auth.getSession()
    
    // Llamamos al backend de Node.js
    const respuesta = await fetch('${import.meta.env.VITE_API_URL}/api/solicitar-creditos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })

    if (!respuesta.ok) throw new Error('Fallo al notificar')
    
    feedbackMessage.value = { 
      type: 'success', 
      text: '¡Solicitud enviada! Ya notificamos al administrador por correo.' 
    }
    outOfCredits.value = false // Ocultamos el botón
    
  } catch (error) {
    feedbackMessage.value = { 
      type: 'error', 
      text: 'No pudimos enviar la solicitud. Intenta de nuevo más tarde.' 
    }
  }
}
</script>

<template>
  <div class="start-container">
    
    <!-- 1. VISTA DEL FORMULARIO (Se oculta si ya hay un cuento digital) -->
    <div v-if="!digitalStory" class="form-card">
      <h2 class="title">Nueva Historia</h2>
      <p class="subtitle">Configura el cuento de esta noche en simples pasos.</p>

      <form @submit.prevent="handleGenerate" class="story-form">
        
        <div class="input-group">
          <label for="name">1. Nombre (Solo aparecerá en el título)</label>
          <input id="name" v-model="childName" type="text" placeholder="Ej. Sofía" required :disabled="isGenerating"/>
        </div>

        <div class="input-group">
          <label for="age">2. ¿Qué edad tiene el lector?</label>
          <div class="select-wrapper">
            <select id="age" v-model="childAge" required :disabled="isGenerating">
              <option value="" disabled selected>Selecciona un rango de edad</option>
              <option v-for="option in ageOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <label for="theme">3. ¿Qué valor o reto trabajaremos hoy?</label>
          <div class="select-wrapper">
            <select id="theme" v-model="selectedTheme" required :disabled="isGenerating">
              <option value="" disabled selected>Selecciona el tema de la historia</option>
              <option v-for="option in themeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="fantasy-check" v-model="useFantasy" :disabled="isGenerating"/>
          <label for="fantasy-check">
            <strong>Permitir Fantasía:</strong> Que el protagonista sea un animalito o criatura mágica en lugar de un niño genérico.
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="isGenerating || !childName || !childAge || !selectedTheme">
          {{ isGenerating ? 'Creando e ilustrando magia...' : 'Generar Cuento' }}
        </button>
      </form>

      <!-- Mensajes de retroalimentación -->
      <div v-if="feedbackMessage.text" :class="['message', feedbackMessage.type]">
        <p>{{ feedbackMessage.text }}</p>
        
        <!-- Botón para solicitar créditos (Aparece si outOfCredits es true) -->
        <button 
          v-if="outOfCredits" 
          @click="handleRequestCredits" 
          class="request-btn"
        >
          Solicitar más créditos
        </button>
      </div>
    </div>

    <!-- 2. NUEVA VISTA DIGITAL (Aparece cuando digitalStory tiene datos) -->
    <div v-else class="reader-card">
      
      <div class="reader-header">
        <h2>{{ digitalStory.titulo }}</h2>
        <button @click="resetForm" class="back-btn">⬅ Crear otro cuento</button>
      </div>

      <!-- Feed de lectura del cuento -->
      <div class="story-feed">
        <div v-for="(pagina, index) in digitalStory.paginas" :key="index" class="story-page">
          <div class="digital-illustration" v-html="pagina.svg"></div>
          <p>{{ pagina.texto }}</p>
        </div>
      </div>

      <!-- Botón de descarga de PDF -->
      <div class="reader-actions">
        <button @click="downloadPDF" class="download-btn">
          🖨️ Descargar versión para Imprimir y Armar
        </button>
      </div>

      <!-- Guía visual e ilustrada de armado del Zine (Se muestra tras hacer clic en descargar) -->
      <div v-if="showInstructions" class="zine-instructions">
        <h3>✂️ Cómo armar tu Mini-Libro</h3>
        
        <div class="instructions-layout">
          <!-- La imagen primero -->
          <div class="instructions-image">
            <img src="@/assets/fanzine_DIY.jpg" alt="Diagrama de armado del Zine" />
          </div>

          <!-- El texto explicativo debajo -->
          <div class="instructions-text">
            <ol>
              <li>Imprime el PDF asegurándote de usar <strong>"Tamaño Real"</strong> y <strong>"Vertical"</strong> en tu impresora.</li>
              <li>Dobla la hoja a la mitad a lo largo (como un hot dog) y desdobla.</li>
              <li>Dobla la hoja a la mitad a lo ancho (como una hamburguesa) y desdobla.</li>
              <li>Lleva los extremos superior e inferior hacia el centro y marca los dobleces.</li>
              <li>Corta con tijeras <strong>solo la línea roja punteada</strong> en el centro de la hoja.</li>
              <li>Abre la hoja, dóblala a lo largo, empuja los extremos hacia el centro (se formará una cruz) y ciérrala.</li>
            </ol>
            <p class="pro-tip">💡 Tip: La página 1 (la portada) siempre debe quedar al frente.</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Mantén tus estilos anteriores... */
.start-container { display: flex; justify-content: center; align-items: flex-start; padding: 1rem; height: 100%; }
.form-card { background: #ffffff; padding: 2rem 1.5rem; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); width: 100%; max-width: 420px; }
.title { font-size: 1.5rem; color: #333; margin-bottom: 0.5rem; text-align: center; }
.subtitle { font-size: 0.95rem; color: #666; margin-bottom: 2rem; text-align: center; }
.story-form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.input-group label { font-size: 0.9rem; font-weight: 600; color: #444; }
.input-group input, .input-group select { width: 100%; padding: 0.8rem 1rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 8px; background-color: #fff; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
.select-wrapper { position: relative; }
.select-wrapper::after { content: '▼'; font-size: 0.8rem; color: #888; position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
.input-group input:focus, .input-group select:focus { outline: none; border-color: #4A90E2; }
.submit-btn { background-color: #4A90E2; color: white; border: none; padding: 1.2rem; font-size: 1.05rem; font-weight: bold; border-radius: 12px; cursor: pointer; transition: background-color 0.2s, transform 0.1s; margin-top: 0.5rem; }
.submit-btn:hover:not(:disabled) { background-color: #357ABD; }
.submit-btn:disabled { background-color: #A0C4E8; cursor: not-allowed; }

/* NUEVOS ESTILOS */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.5rem 0;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
}
.checkbox-group input[type="checkbox"] {
  width: 22px;
  height: 22px;
  margin-top: 0.1rem;
  accent-color: #4A90E2;
  cursor: pointer;
}
.checkbox-group label {
  font-size: 0.85rem;
  color: #444;
  line-height: 1.4;
  cursor: pointer;
}

.message { margin-top: 1.5rem; padding: 1rem; border-radius: 8px; font-size: 0.9rem; text-align: center; line-height: 1.4; animation: fadeIn 0.3s ease-in; }
.message p { margin: 0; }
.message.success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.message.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

/* Botón secundario para solicitar créditos */
.request-btn {
  margin-top: 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}
.request-btn:hover {
  background-color: #000;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }


/* Estilos actualizados para la guía de armado */
.zine-instructions {
  margin-top: 1.5rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  animation: fadeIn 0.4s ease-in-out;
}
.zine-instructions h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-size: 1.15rem;
  text-align: center;
}

/* Layout vertical en todas las pantallas */
.instructions-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

/* Control del tamaño de la imagen */
.instructions-image {
  width: 100%;
  max-width: 500px; /* Evita que la imagen sea inmensa en PC */
  display: flex;
  justify-content: center;
}
.instructions-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #ddd;
}

/* Estilos de texto */
.instructions-text {
  width: 100%;
}
.instructions-text ol {
  padding-left: 1.2rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
.instructions-text li {
  margin-bottom: 0.6rem;
}

.pro-tip {
  background-color: #fff3cd;
  color: #856404;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  border-left: 4px solid #ffeeba;
}

/* Estilos de la Vista Digital */
.reader-card { background: #ffffff; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); width: 100%; max-width: 500px; }
.reader-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; border-bottom: 2px dashed #eee; padding-bottom: 1rem; }
.reader-header h2 { color: #333; margin-bottom: 1rem; text-align: center; }
.back-btn { background: none; border: none; color: #4A90E2; font-weight: bold; cursor: pointer; padding: 0.5rem; }
.back-btn:hover { text-decoration: underline; }

.story-feed { display: flex; flex-direction: column; gap: 1.5rem; }
.story-page { background: #fcfcfc; border: 1px solid #f0f0f0; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; animation: fadeIn 0.5s ease-in-out; }
.story-page p { font-size: 1.1rem; color: #444; line-height: 1.5; margin: 0; }
.digital-illustration { width: 100px; height: 100px; margin-bottom: 1rem; }
.digital-illustration :deep(svg) { width: 100%; height: 100%; }

.reader-actions { margin-top: 2rem; display: flex; justify-content: center; }
.download-btn { background-color: #333; color: white; border: none; padding: 1rem 1.5rem; font-size: 1rem; font-weight: bold; border-radius: 12px; cursor: pointer; width: 100%; transition: background 0.2s; }
.download-btn:hover { background-color: #000; }
</style>