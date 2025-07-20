<template>
  <div class="contendor">

    <div class="tab-nav">
      <button @click="activa_tab = 'tabla'" class="tab" :class="{ active: activa_tab === 'tabla' }">
        <i class="fa-solid fa-users"></i> Empleados
      </button>
      <button @click="activa_tab = 'registro'" class="tab" :class="{ active: activa_tab === 'registro' }">
        <i class="fas fa-user-plus"></i> Registrar Nuevo Empleado
      </button>
    </div>

    <TablaEmpleado v-if="activa_tab === 'tabla'" />
    <RegistroEmpleado v-if="activa_tab === 'registro'" />
  </div>
</template>

<script setup>
import RegistroEmpleado from './RegistroEmpleado.vue';
import TablaEmpleado from './TablaEmpleado.vue';

import { ref } from 'vue';
const activa_tab = ref('tabla')

</script>

<style scoped>
.tab-nav {
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f8f9fa;
  border: none;
  border-radius: 5px 5px 0 0;
  font-weight: bold;
  font-size: 16px;
  color: #10b68d;
}

.tab.active {
  background-color: rgb(247, 247, 247);
  border-bottom: 2px solid #018175;
}

@media (max-width: 768px) {
  .tab-nav {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>