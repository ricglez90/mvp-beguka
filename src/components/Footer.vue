<template>
  <footer class="footer">
    <span class="footer-brand">Beguka</span>
    <span class="footer-copy">&copy; 2026 Todos los derechos reservados.</span>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #07002C;
  color: #fffae4;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid #f8bb4a;
  box-sizing: border-box;
  z-index: 100;
  font-size: 0.85rem;
}

.footer-brand {
  color: #00abf3;
  font-weight: 900;
  font-size: 1.1rem;
}

.footer-copy {
  opacity: 0.8;
}

/* En celulares, ocultamos el texto largo para que no se amontone */
@media (max-width: 480px) {
  .footer-copy {
    font-size: 0.75rem;
  }
}
</style>