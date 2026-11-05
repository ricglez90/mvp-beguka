<script setup>
import { ref, onMounted } from 'vue'
import { supabaseStoryteller } from '@/services/supabaseStoryteller'

const users = ref([])
const loading = ref(true)
const errorMessage = ref('')

const fetchUsers = async () => {
  loading.value = true
  errorMessage.value = ''
  
  // Traemos a todos los usuarios, ordenando primero a los que solicitaron créditos
  const { data, error } = await supabaseStoryteller
    .from('profiles')
    .select('*')
    .order('credit_requested', { ascending: false })
    .order('created_at', { ascending: false })
  
  if (error) {
    errorMessage.value = 'Error al cargar usuarios. ¿Eres administrador?'
    console.error(error)
  } else {
    users.value = data
  }
  
  loading.value = false
}

const grantCredits = async (userId, currentCredits) => {
  // Le sumamos 3 créditos y apagamos la alarma de solicitud
  const { error } = await supabaseStoryteller
    .from('profiles')
    .update({ 
      credits_available: currentCredits + 3,
      credit_requested: false
    })
    .eq('id', userId)

  if (error) {
    alert('Error al otorgar créditos')
  } else {
    fetchUsers() // Recargamos la lista para ver los cambios
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="admin-container">
    <div class="admin-card">
      <h2 class="title">Panel de Control</h2>
      <p class="subtitle">Gestión de usuarios y créditos</p>

      <div v-if="loading" class="loading">Cargando datos...</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <div v-if="!loading && users.length > 0" class="users-list">
        <!-- Tarjeta individual por cada usuario -->
        <div 
          v-for="user in users" 
          :key="user.id" 
          :class="['user-row', { 'has-request': user.credit_requested }]"
        >
          <div class="user-info">
            <span class="email">{{ user.email }}</span>
            <span class="credits">Créditos: <strong>{{ user.credits_available }}</strong></span>
          </div>
          
          <div class="actions">
            <span v-if="user.credit_requested" class="badge">¡Solicita créditos!</span>
            <button @click="grantCredits(user.id, user.credits_available)" class="grant-btn">
              +3 Créditos
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.admin-container { padding: 1rem; max-width: 800px; margin: 0 auto; }
.admin-card { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.title { font-size: 1.5rem; color: #333; margin-bottom: 0.5rem; }
.subtitle { font-size: 0.95rem; color: #666; margin-bottom: 2rem; }

.loading { text-align: center; color: #666; padding: 2rem; }
.error { background: #FFEBEE; color: #C62828; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }

.users-list { display: flex; flex-direction: column; gap: 1rem; }
.user-row { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 1rem; border: 1px solid #eee; border-radius: 8px; 
  background-color: #fafafa; transition: all 0.2s;
}
/* Resaltar visualmente a los que piden ayuda */
.user-row.has-request {
  border-color: #FFB74D;
  background-color: #FFF8E1;
}

.user-info { display: flex; flex-direction: column; gap: 0.3rem; }
.email { font-weight: 600; color: #333; }
.credits { font-size: 0.85rem; color: #666; }

.actions { display: flex; align-items: center; gap: 1rem; }
.badge { background: #FF9800; color: white; padding: 0.3rem 0.6rem; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
.grant-btn { 
  background: #4CAF50; color: white; border: none; 
  padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; 
  font-weight: bold; transition: background 0.2s;
}
.grant-btn:hover { background: #388E3C; }

/* Responsive para móviles */
@media (max-width: 500px) {
  .user-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .actions { width: 100%; justify-content: space-between; }
}
</style>