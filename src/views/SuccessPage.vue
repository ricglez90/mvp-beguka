<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page-wrapper">
    <div class="success-container">
      <div class="icon">🎉</div>
      <h1>¡Pago Confirmado!</h1>
      <p>Tu orden ha sido procesada exitosamente.</p>
      
      <div class="instructions-box">
        <h3>¿Qué sigue ahora?</h3>
        <p>Acabamos de enviar un correo electrónico con tu recibo y el <strong>enlace de acceso único</strong> para descargar tu manual y tus bonos.</p>
        <p><em>Por favor revisa tu bandeja de entrada (y la carpeta de promociones o spam por si acaso).</em></p>
      </div>

      <button @click="router.push('/')" class="home-button">
        Volver a la página principal
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  --c-dark: #07002C;
  --c-light: #fffae4;
  --c-green: #89cb72;
  --c-blue: #00abf3;

  min-height: 100vh;
  background-color: var(--c-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 1rem;
}

.success-container {
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(7, 0, 44, 0.1);
  text-align: center;
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

h1 {
  color: var(--c-dark);
  margin-top: 0;
}

.instructions-box {
  background-color: rgba(0, 171, 243, 0.1);
  border: 1px solid var(--c-blue);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
  color: var(--c-dark);
}

.instructions-box h3 {
  color: var(--c-blue);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.home-button {
  padding: 1rem 2rem;
  background-color: var(--c-green);
  color: var(--c-dark);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
}

.home-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}
</style>