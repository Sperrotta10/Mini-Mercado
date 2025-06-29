<template>
  <div class="contenedor_suporte_producto_categorias">
      <h3>Categorías</h3>
    <div class="contenedor_categorias">
        <div 
          v-for="(categoria, index) in categorias" 
          :key="index" 
          class="carta_categoria"
        >
          <div class="imagen_categoria">
            <img :src="categoria.imagen" alt="">
          </div>
          <div class="contenido_categoria">
            <p class="nombre_categoria">{{ categoria.name }}</p>
          </div>
        </div>
    </div>
  </div>
    
</template>

<script setup>
import { ref } from 'vue';
import frutas from '@/assets/Imagenes/fruta.jpg'
import vegetales from '@/assets/Imagenes/vegetal 2.jpg'
import chucheria from '@/assets/Imagenes/chucheria.jpg'
import refresco from '@/assets/Imagenes/refresco.jpg'
import helados from '@/assets/Imagenes/helado.png'

const categorias = ref([
  {
    name: 'Frutas',
    imagen: frutas
  },
  {
    name: 'Vegetales',
    imagen: vegetales
  },
  {
    name: 'Chuchería',
    imagen: chucheria
  },
  {
    name: 'Refresco',
    imagen: refresco
  },
  {
    name: 'Helados',
    imagen: helados
  }
]);
</script>

<style scoped>
.contenedor_suporte_producto_categorias{
  max-width: 90%;
  margin: 10px auto;
}

.contendor_separador{
  display: flex;
  align-items: center;
  text-align: center;
}

.lineas{ /*Era una opcion si se quiere ponerse en linea */
  height: 1px;
  width: 100%;
  background-color: #004C45;
  margin: 0px 10px;
}

h3{
  text-align: center;
  color: #018175;
  margin: 20px 0px;
  font-size: 2.0rem;
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
  
}

.imagen_categoria img{
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.contenido_categoria {
  margin: 10px 0px;
  padding: 15px 10px;
}

.nombre_categoria {
  font-size: 1rem;
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