<template>
  <div class="contenedor_suporte_producto_categorias">
    <div class="contenedor_categorias">
        <div 
          v-for="(categoria, index) in categorias" 
          :key="index" 
          class="carta_categoria"
        >
          <div class="imagen_categoria">
            <img :src="pizzaImg" alt="">
          </div>
          <div class="contenido_categoria">
            <h3 class="nombre_categoria">{{ categoria.name }}</h3>
          </div>
        </div>
    </div>
  </div>
    
</template>

<script setup>
import { ref } from 'vue';
import pizzaImg from '@/assets/Imagenes/cocacola.png'

const categorias = ref([
  {
    name: 'Test',
  },
  {
    name: 'Test',
  },
  {
    name: 'Test',
  },
  {
    name: 'Test',
  },
  {
    name: 'Test',
  }
]);
</script>

<style scoped>
.contenedor_suporte_producto_categorias{
  max-width: 90%;
  margin: 10px auto;
}

.contenedor_categorias {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.carta_categoria {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.carta_categoria:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.imagen_categoria {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagen_categoria img{
  width: 100%;
  height: auto;
}

.contenido_categoria {
  padding: 25px;
}

.nombre_categoria {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

/* Areas de responsive */
@media (max-width: 992px) {
  .contenedor_categorias {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 576px) {
  .contenedor_categorias {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>