<template>

    <!--Area de header-->
    <header_general></header_general>

    <main>
      <!--Area de Carousel, para el manejo de publicidad-->
      <Publicidad_carousel></Publicidad_carousel>

      <!--Areas de Categorias de producto-->
      <categorias_producto></categorias_producto>

      <!--Area de Productos-->
        <div class="contenedor_producto">


          <div
            v-for="categoria in categoriasConProductos"
            :key="categoria.id"
            class="contenedor_lista_producto"
          >
            <div class="contenedor_titulo">
              <h2>{{ categoria.name }}</h2>
            </div>
            <div class="contenedor_caja_producto">
              <Carta_categoria :categoria="categoria" :imagen="categoria.image" />
              <Carta_producto
                v-for="producto in categoria.productos"
                :key="producto.product_id"
                :id="producto.product_id"
                :imagen="producto.image"
                :nombre="producto.name"
                :precio="producto.price"
              />
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
import header_general from '@/modules/header_general.vue'
import FooterComponente from '../components/Footer_Detalles.vue'
import PresentacionMarket from '../components/PresentacionMarket.vue'
import Carta_producto from '../components/Carta_producto.vue'
import Publicidad_carousel from '../components/publicidad_carousel.vue'
import categorias_producto from '../components/categorias_producto.vue'
import Carta_categoria from '../components/Carta_categoria.vue'
import { ref, onMounted } from 'vue'
import { ProductService } from '@/utils/productServices'
import { categoryService } from '@/utils/categoryServices'

const categoriasConProductos = ref([])
const productService = new ProductService()

onMounted(async () => {
  // Obtener categorías y productos de la base de datos
  const categorias = await categoryService.getCategories()
  const productos = await productService.getProducts()
  if (!categorias || !productos) return

  categoriasConProductos.value = categorias.data.map(cat => ({
    ...cat,
    productos: productos.data.filter(p => p.categoria_id === cat.categoria_id).slice(0, 5)
  }))
})
</script>

<style scoped>
@import url('./pagina_principal.css');
</style>