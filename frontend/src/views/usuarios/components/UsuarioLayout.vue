<template>
  <div class="usuario_layout">
    <Navbar />
    <div class="contenedor_contenido">
      <Header />
      <main class="contenerdor_main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from './NavBar.vue'
import Header from './HeaderComponente.vue'
</script>

<style scoped>
.usuario_layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.contenedor_contenido {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}


.contenerdor_main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .usuario_layout {
    flex-direction: column;
  }
  
  .contenedor_contenido {
    margin-left: 0;
  }
}
</style>