<template>

    <!--Area de header-->
    <header_general></header_general>

    <main>
      <!--Area de Carousel, para el manejo de publicidad-->
      <Publicidad_carousel></Publicidad_carousel>

      <!--Areas de Categorias de producto-->
      <categorias_producto></categorias_producto>

      <!--Area de Productos-->
        <div class="contendor_producto">

          <div class="contenedor_lista_producto">
            <h2>Productos recomendados</h2>
            <div class="contenedor_caja_producto">
                <!--Podemos que llamar 2 formas los componentes, para que si el futuro quieran hacer-->
                <!--Con el ciclo for-->
                <Carta_producto 
                    v-for="producto in productos" 
                    :key="producto.id"
                    :imagen="producto.imagen"
                    :nombre="producto.nombre"
                    :precio="producto.precio"
                ></Carta_producto>

                <!--O simplemente llenar los datos-->
                <Carta_producto :nombre="'Pizza_mas'" :precio="234" :imagen="pizzaImg"></Carta_producto>
            </div>
          </div>

          <div class="contenedor_lista_producto">
            <h2>Frutas y verduras</h2>
            <div class="contenedor_caja_producto">
                <!--Podemos que llamar 2 formas los componentes, para que si el futuro quieran hacer-->
                <!--Con el ciclo for-->
                <Carta_categoria></Carta_categoria>
                <Carta_producto 
                    v-for="producto in productos" 
                    :key="producto.id"
                    :imagen="producto.imagen"
                    :nombre="producto.nombre"
                    :precio="producto.precio"
                ></Carta_producto>

                <!--O simplemente llenar los datos-->
                <!-- <Carta_producto :nombre="'Pizza_mas'" :precio="234" :imagen="pizzaImg"></Carta_producto> -->
            </div>
          </div>

          <!--Es un ejemplo, para tener ideas como se ve cuando se conecta la base de datos-->
          <div class="contenedor_lista_producto">
            <h2>Carnicería</h2>
            <div class="contenedor_caja_producto">
                <!--Podemos que llamar 2 formas los componentes, para que si el futuro quieran hacer-->
                <!--Con el ciclo for-->
                <Carta_categoria></Carta_categoria>
                <Carta_producto 
                    v-for="producto in productos" 
                    :key="producto.id"
                    :imagen="producto.imagen"
                    :nombre="producto.nombre"
                    :precio="producto.precio"
                ></Carta_producto>

                <!--O simplemente llenar los datos-->
                <!-- <Carta_producto :nombre="'Pizza_mas'" :precio="234" :imagen="pizzaImg"></Carta_producto> -->
            </div>
          </div>

          <!--Es un ejemplo, para tener ideas como se ve cuando se conecta la base de datos-->
          <div class="contenedor_lista_producto">
            <h2>Snacks y dulces</h2>
            <div class="contenedor_caja_producto">
                <!--Podemos que llamar 2 formas los componentes, para que si el futuro quieran hacer-->
                <!--Con el ciclo for-->
                <Carta_categoria></Carta_categoria>
                <Carta_producto 
                    v-for="producto in productos" 
                    :key="producto.id"
                    :imagen="producto.imagen"
                    :nombre="producto.nombre"
                    :precio="producto.precio"
                ></Carta_producto>

                <!--O simplemente llenar los datos-->
                <!-- <Carta_producto :nombre="'Pizza_mas'" :precio="234" :imagen="pizzaImg"></Carta_producto> -->
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

import pizzaImg from '@/assets/Imagenes/productos/pizza jamon.png'
import cafe from '@/assets/Imagenes/productos/cafe.jpg'
import manzana from '@/assets/Imagenes/productos/manzana.png'
import naranja from '@/assets/Imagenes/productos/naranja.png'

const productos = [
  {
    id: 1,
    nombre: 'Pizza',
    precio: '19.90',
    imagen: manzana
  },
  {
    id: 2,
    nombre: 'Pizza2',
    precio: '15.90',
    imagen: naranja
  },
  {
    id: 3,
    nombre: 'Pizza3',
    precio: '15.90',
    imagen: pizzaImg
  },
  {
    id: 4,
    nombre: 'Pizza4',
    precio: '15.90',
    imagen: cafe
  },
  {
    id: 5,
    nombre: 'Pizza5',
    precio: '15.90',
    imagen: manzana
  }
]
</script>

<style scoped>
@import url('./pagina_principal.css');
</style>