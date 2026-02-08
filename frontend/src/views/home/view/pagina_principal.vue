<template>

    <!--Area de header-->
    <header_general></header_general>

    <main>
      <!--Area de Carousel, para el manejo de publicidad-->
      <Publicidad_carousel></Publicidad_carousel>

      <!--Areas de Categorias de producto-->
      <categorias_producto></categorias_producto>

      <!--Area de Productos-->
        <div v-if="!cargando" class="contenedor_producto">
          <div 
            class="cedula"
            v-if="AuthStore.user?.role === 'cliente' && !AuthStore.userData?.cedula && AuthStore.isAuthenticated"
            >
            <CedulaCliente 
              :show="mostrarModal" 
              @close="mostrarModal = false" 
              @cedula-submitted="manejarCedula" 
            />
          </div>

          <div
            v-for="categoria in categoriasConProductos"
            :key="categoria.categoria_id"
            class="contenedor_lista_producto"
          >
            <div class="contenedor_titulo">
              <h2>{{ categoria.name }}</h2>
              <RouterLink
                class="btn_ver_todas"
                :to="{ name: 'categoria', params: { id: categoria.categoria_id, slug: slugify(categoria.name) } }"
              >
                Ver todas
              </RouterLink>
            </div>
            <div class="contenedor_carrusel">
              <button class="btn_carrusel prev" type="button" @click="scrollCarrusel(categoria.categoria_id, -1)">
                ‹
              </button>

              <div class="carrusel_pista" :id="`carrusel-${categoria.categoria_id}`">
                <div
                  v-for="producto in categoria.productos"
                  :key="producto.product_id"
                  class="carrusel_item"
                >
                  <Carta_producto
                    :id="producto.product_id"
                    :imagen="producto.image"
                    :nombre="producto.name"
                    :stock="producto.stock"
                    :precio="producto.price"
                    :oferta="producto.oferta"
                    :isPremium="isPremium"
                  />
                </div>
              </div>

              <button class="btn_carrusel next" type="button" @click="scrollCarrusel(categoria.categoria_id, 1)">
                ›
              </button>
            </div>
          </div>
          
          
        </div>
        <div v-else class="contenedor_producto">
          <div class="contenedor_lista_producto">
            <div class="contenedor_titulo">
              <h2>Productos</h2>
            </div>
            <div class="carrusel_pista">
              <div v-for="i in 8" :key="i" class="carrusel_item">
                <SkeletonProductCard />
              </div>
            </div>
          </div>
        </div>
    </main>

    <!--Area de presentacion de MSJ Market-->
    <PresentacionMarket></PresentacionMarket>
    
    <!--Area de footer-->
    <FooterComponente></FooterComponente>
</template>

<script setup>
import { useAuthStore } from '@/stores/Auth'
import header_general from '@/modules/header_general.vue'
import FooterComponente from '../components/Footer_Detalles.vue'
import PresentacionMarket from '../components/PresentacionMarket.vue'
import Carta_producto from '../components/Carta_producto.vue'
import Publicidad_carousel from '../components/publicidad_carousel.vue'
import categorias_producto from '../components/categorias_producto.vue'
import { ref, onMounted } from 'vue'
import { ProductService } from '@/utils/productServices'
import { categoryService } from '@/utils/categoryServices'
import { slugify } from '@/utils/slugify';
import CedulaCliente from '../components/CedulaCliente.vue'
import { RouterLink } from 'vue-router'
import SkeletonProductCard from '@/components/skeleton/SkeletonProductCard.vue';

const AuthStore = useAuthStore();
const cargando = ref(true); // bandera de carga

const categoriasConProductos = ref([])
const productService = new ProductService()
const isPremium = ref(false);

onMounted(async () => {
  // Obtener categorías y productos de la base de datos
  // En vistas públicas no forzamos verificación de sesión (evita 401 en consola)
  isPremium.value = AuthStore.userData?.suscripcion || false;
  
  const categorias = await categoryService.getCategories()
  const productos = await productService.getProducts()
  if (!categorias || !productos) return

  categoriasConProductos.value = categorias.data.map(cat => ({
    ...cat,
    productos: productos.data.filter(p => p.categoria_id === cat.categoria_id).slice(0, 10)
  }))
  cargando.value = false;
})

const mostrarModal = ref(true);
function manejarCedula() {
  mostrarModal.value = false; // Esto también cierra la modal
}

function scrollCarrusel(categoriaId, direction) {
  const el = document.getElementById(`carrusel-${categoriaId}`)
  if (!el) return

  const amount = Math.max(240, Math.floor(el.clientWidth * 0.8))
  el.scrollBy({ left: direction * amount, behavior: 'smooth' })
}
</script>

<style scoped>
@import url('./Pagina_principal.css');
</style>