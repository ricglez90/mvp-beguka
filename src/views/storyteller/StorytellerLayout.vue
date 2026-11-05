<script setup>
// Aquí puedes agregar lógica global del portal, como checar la sesión activa
</script>

<template>
  <div class="storyteller-app">
    <!-- Aquí puedes poner un Header minimalista con el logo del portal y los créditos del usuario -->
    <header class="mobile-header">
      <h1>Portal de Historias</h1>
    </header>

    <!-- Aquí se inyectarán Login, Start, o Admin dependiendo de la URL -->
    <main class="content-area">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.storyteller-app {
  min-height: 100vh;
  background-color: #f4f4f9; /* Color distinto a Beguka */
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, sans-serif;
}

.mobile-header {
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.content-area {
  flex: 1;
  padding: 1rem;
  max-width: 480px; /* Restringe el ancho para forzar la vista móvil incluso en desktop */
  margin: 0 auto;
  width: 100%;
}
</style>