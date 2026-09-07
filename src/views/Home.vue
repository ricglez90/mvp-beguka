<template>
  <div class="app-container">
    <Navbar />

    <main>
      <!-- SECCIÓN 1: Inicio (Hero + Tarjetas Centrales) -->
      <section id="inicio" class="section hero-section">
        <h1 class="hero-title">Pequeños héroes.<br><span class="highlight">Grandes aventuras.</span></h1>
        <p class="hero-subtitle">Recursos digitales para acompañar la crianza y crear un lugar seguro a través del poder de las historias.</p>
        
        <div class="cards-container">
          <ServiceCard 
            title="Manuales de Apoyo"
            description="Descarga nuestras guías prácticas para fortalecer la autoestima y validar emociones sin perder la paciencia."
            badge="Gratis"
            btnText="Descargar Manual"
            headerColor="#89cb72"
            :isAvailable="true"
          />
          <ServiceCard 
            title="Portal de Historias"
            description="Un universo interactivo donde las narrativas se adaptan para ayudar a tus hijos a enfrentar sus propios retos."
            badge="Próximamente"
            btnText="En Construcción"
            headerColor="#f8bb4a"
            :isAvailable="false"
          />
        </div>
      </section>

      <!-- SECCIÓN 2: Acerca de -->
      <section id="acerca-de" class="section alt-section">
        <h2 class="section-title">¿Qué es Beguka?</h2>
        <div class="section-content text-center">
          <p>No somos psicólogos ni terapeutas de traje. Somos guías de aventura.</p>
          <p>Creemos que la lógica de los adultos rara vez funciona con los niños. Por eso, hemos creado un personaje que habla en su idioma para ayudarlos a descubrir que sus diferencias son, en realidad, sus mayores superpoderes.</p>
        </div>
      </section>

      <!-- SECCIÓN 3: Comunidad -->
      <section id="comunidad" class="section text-center">
        <h2 class="section-title">Únete a la Misión</h2>
        <p class="section-content">No estás solo en esto. Miles de papás están aprendiendo a cambiar los regaños por mejores historias.</p>
        <h3 class="section-title">Síguemos en:</h3>
        <a href="https://www.instagram.com/betilu.beguka/" target="_blank" class="action-link">Instagram</a>
        <a href="https://www.facebook.com/profile.php?id=61593861926722" target="_blank" class="action-link">Facebook</a>
      </section>

      <!-- SECCIÓN 4: Contacto -->
      <section id="contacto" class="section alt-section text-center">
        <h2 class="section-title">¿Necesitas ayuda?</h2>
        <p class="section-content">Mándanos un mensaje y te responderemos antes de que termine la próxima misión.</p>
        <a href="mailto:contacto.beguka@gmail.com" class="action-btn">contacto.beguka@gmail.com</a>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ServiceCard from '@/components/ServiceCard.vue';
</script>

<style>
#app {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: block; /* Vite a veces lo pone en flex */
}

html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Evita cualquier scroll horizontal accidental */
}
/* CSS GLOBAL PARA EL COMPORTAMIENTO DE LA SPA */
html {
  scroll-behavior: smooth;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: #fffae4;
  color: #07002C;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.section {
  padding: 80px 20px;
  width: 100%;
  max-width: 100%; /* Forzamos a que el fondo llegue de orilla a orilla siempre */
  box-sizing: border-box; /* Evita que el padding cause un scroll horizontal */
  margin: 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
}
.alt-section {
  background-color: #07002C;
  color: #fffae4;
  width: 100%;
  max-width: 100%;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alt-section .section-title {
  color: #00abf3;
}

.hero-section {
  text-align: center;
  padding-top: 100px;
}

.hero-title {
  font-size: 3.5rem;
  margin: 0 0 20px 0;
  color: #07002C;
}

.highlight {
  color: #00abf3;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 50px auto;
  line-height: 1.6;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 900px;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #07002C;
}

.section-content {
  font-size: 1.2rem;
  max-width: 700px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}

.action-link {
  color: #00abf3;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: underline;
  text-decoration-thickness: 3px;
}

.action-btn {
  display: inline-block;
  background-color: #f8bb4a;
  color: #07002C;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border: 3px solid #07002C;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 4px 4px 0px 0px #00abf3;
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: translateY(-3px);
}

/* 1. Compensa el espacio de los menús fijos */
main {
  padding-top: 75px; /* Alto del Navbar */
  padding-bottom: 45px; /* Alto del Footer compacto */
}

/* 2. Textura de cuaderno para secciones claras (Inicio, Comunidad) */
.section:not(.alt-section) {
  background-color: #fffae4;
  /* Dibuja la línea roja vertical a los 40px y las líneas azules horizontales cada 30px */
  background-image: 
    linear-gradient(90deg, transparent 40px, rgba(234, 67, 53, 0.4) 40px, rgba(234, 67, 53, 0.4) 42px, transparent 42px),
    linear-gradient(rgba(0, 171, 243, 0.15) 1px, transparent 1px);
  background-size: 100% 100%, 100% 30px;
}

/* 3. Textura de cuaderno para secciones oscuras (Acerca de, Contacto) */
.alt-section {
  background-color: #07002C;
  /* Dibuja la línea amarilla vertical y líneas crema tenues horizontales */
  background-image: 
    linear-gradient(90deg, transparent 40px, rgba(248, 187, 74, 0.4) 40px, rgba(248, 187, 74, 0.4) 42px, transparent 42px),
    linear-gradient(rgba(255, 250, 228, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 100% 30px;
}

/* (Opcional) Aseguramos que el contenido principal de la sección quede por encima del fondo */
.section-content, .hero-title, .hero-subtitle, .cards-container, .section-title {
  position: relative;
  z-index: 2;
}
</style>