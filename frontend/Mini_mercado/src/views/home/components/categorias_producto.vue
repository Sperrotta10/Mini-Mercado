<template>
  <div class="contenedor_suporte_producto_categorias">
    <div class="contenedor_titulo">
      <h1>Categorías</h1>
    </div>
    <div class="contenedor_categorias">
      <div 
      v-for="(categoria) in categoriesList" 
      :key="categoria.categoria_id" 
      class="carta_categoria"
      >
        <RouterLink target="_blank" :to="`/categoria/${categoria.categoria_id}`" class="carta_link">
          <div class="imagen_categoria">
            <img :src="categoria.image" loading="lazy" alt="">
          </div>
          <div class="contenido_categoria">
            <p class="nombre_categoria">{{ categoria.name }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { categoryService } from '@/utils/categoryServices';
import { onMounted, ref } from 'vue';

const categoriesList = ref([]);
onMounted(() => {
    categoryService.getCategories().then(categories => {
        categoriesList.value = categories.data;
        console.log('categories fetched:', categoriesList.value);
    }).catch(error => {
        console.error("Error fetching categories:", error);
    });
});
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

.contenedor_titulo{
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0
}

.contenedor_titulo h1{
  color: #018175;
  font-size: 2.0rem;
}

.contenedor_categorias {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.carta_link {
  text-decoration: none;
}

.carta_link p:hover{
  color: #018175;
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
  scale: 1.1;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
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