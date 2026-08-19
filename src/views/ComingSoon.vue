<script setup>
// Lógica simple, listo para escalar cuando quieras agregar un formulario de espera
</script>

<template>
  <div class="coming-soon-wrapper">
    <div class="content-box">
      <div class="icon-container">
        <span class="pulse-icon">🚀</span>
      </div>
      
      <!-- Texto Animado -->
      <h1 class="animated-gradient-text">Sitio en Construcción</h1>
      
      <p class="subtitle">
        Estamos preparando herramientas y recursos increíbles. 
        Vuelve pronto para descubrir lo que hemos construido para ti.
      </p>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coming-soon-wrapper {
  --c-dark: #07002C;
  --c-light: #fffae4;
  --c-yellow: #f8bb4a;
  --c-green: #89cb72;
  --c-blue: #00abf3;

  min-height: 100vh;
  background-color: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 2rem;
}

.content-box {
  background: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(7, 0, 44, 0.08);
  text-align: center;
  max-width: 500px;
  width: 100%;
  border-bottom: 5px solid var(--c-blue);
}

.icon-container {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.pulse-icon {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

/* LA MAGIA DE LA ANIMACIÓN DEL TEXTO */
.animated-gradient-text {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  /* Creamos un fondo más ancho que el texto con tus colores */
  background: linear-gradient(
    to right, 
    var(--c-blue), 
    var(--c-green), 
    var(--c-yellow), 
    var(--c-blue)
  );
  background-size: 300% auto;
  /* Recortamos el fondo con la forma de las letras */
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  /* Lo animamos */
  animation: shine 4s linear infinite;
}

.subtitle {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, var(--c-blue), var(--c-green));
  border-radius: 10px;
  animation: load 2s ease-out infinite alternate;
}

/* KEYFRAMES (Animaciones) */
@keyframes shine {
  to {
    background-position: 300% center;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes load {
  0% { width: 30%; }
  100% { width: 70%; }
}

/* Responsividad para móviles */
@media (max-width: 480px) {
  .animated-gradient-text {
    font-size: 2rem;
  }
}
</style>