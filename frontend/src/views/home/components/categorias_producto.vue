<template>
  <div class="contenedor_suporte_producto_categorias">
    <div class="contenedor_titulo">
      <h1>Categorías</h1>
    </div>
    <div class="contenedor_categorias">
      <template v-if="cargandoCategorias">
        <div v-for="i in 7" :key="i" class="categoria_skeleton_item">
          <SkeletonCategoryCard />
        </div>
      </template>

      <template v-else>
        <div
          v-for="(categoria) in categoriesList"
          :key="categoria.categoria_id"
          class="carta_categoria"
        >
          <RouterLink
            :to="{ name: 'categoria', params: { id: categoria.categoria_id, slug: slugify(categoria.name) } }"
            class="carta_link"
          >
            <div class="imagen_categoria">
              <img :src="categoria.image" loading="lazy" alt="">
            </div>
            <div class="contenido_categoria">
              <p class="nombre_categoria">{{ categoria.name }}</p>
            </div>
          </RouterLink>
        </div>
      </template>
    </div>
  </div> 
</template>

<script setup>
import { categoryService } from '@/utils/categoryServices';
import { onMounted, ref } from 'vue';
import { slugify } from '@/utils/slugify';
import SkeletonCategoryCard from '@/components/skeleton/SkeletonCategoryCard.vue';

const categoriesList = ref([]);
const cargandoCategorias = ref(true);
onMounted(() => {
  cargandoCategorias.value = true;
  categoryService.getCategories().then(categories => {
    categoriesList.value = categories.data;
  }).catch(error => {
    console.error("Error fetching categories:", error);
    categoriesList.value = [];
  }).finally(() => {
    cargandoCategorias.value = false;
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
  height: 260px;
}

.categoria_skeleton_item {
  width: 100%;
}

/* Skeleton ocupa toda la celda */
.contenedor_categorias > div > :deep(.sk_cat) {
  width: 100%;
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
  height: 140px;
  object-fit: cover;
}

.contenido_categoria {
  margin: 10px 0px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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

/* Carrusel en mobile */
@media (max-width: 768px) {
  .contenedor_categorias {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 16px;
    padding: 6px 2px 14px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .carta_categoria {
    flex: 0 0 220px;
    scroll-snap-align: start;
  }

  /* En pantallas táctiles evitamos el “salto” por hover */
  .carta_categoria:hover {
    scale: 1;
  }
}

@media (max-width: 576px) {
  .carta_categoria {
    height: 220px;
    flex-basis: 200px;
  }

  .imagen_categoria img {
    height: 120px;
  }
}
</style>