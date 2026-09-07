<template>
  <nav class="navbar">
    <div class="nav-brand">Beguka</div>
    <ul class="nav-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#acerca-de">Acerca de</a></li>
      <li><a href="#comunidad">Comunidad</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #fffae4;
  border-bottom: 4px solid #07002C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 100;
}

.nav-brand {
  font-size: 2rem;
  font-weight: 900;
  color: #00abf3;
  text-shadow: 2px 2px 0px #07002C;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #07002C;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #89cb72;
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* Aquí luego puedes agregar un menú hamburguesa */
  }
}
</style>