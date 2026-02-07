<template>
  <header class="header">
    <div class="header_izquierda">
      <h2 class="Colores_titulo">{{ RouteTitulo }}</h2>
    </div>
    <div class="header_derecha">
      <button class="btn_salir" @click="salir">Salir Sesión</button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const RouteTitulo = computed(() => {
  return route.meta.title || '¡Bienvenidos!'
})

const salir = () => {
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.header_izquierda {
  display: flex;
  align-items: center;
}

.Colores_titulo{
  color: #10b68d;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-right: 15px;
  cursor: pointer;
}

.header_derecha {
  display: flex;
  align-items: center;
}

.usuario_admin {
  margin-right: 15px;
}

.btn_salir {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn_salir:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .navbar.mobile-show {
    display: block;
  }
}
</style>