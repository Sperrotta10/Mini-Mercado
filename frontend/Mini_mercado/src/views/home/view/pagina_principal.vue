<template>
    <header>
        <div class="barra_principal">
                <Logo_con_link></Logo_con_link>

                <div class="contenedor_buscador">
                    <input type="text" placeholder="Buscar producto">
                    <button>Buscar</button>
                </div>

                <div class="contendor_accion_usuarios">
                    <button class="btn_login"><router-link to ="/login" class="btn_link"><i class="fas fa-user"></i> Login</router-link></button>
                    <button class="btn_carrito"><i class="fas fa-shopping-cart"></i> Carrito</button>
                </div>
        </div>
    
    </header>

    <main>
      <!--Area de Carousel, para el manejo de publicidad-->
      <Publicidad_carousel></Publicidad_carousel>

      <!--Area de Productos-->
        <div class="contendor_producto">

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
    </main>

    <footer>
        <span>© 2025 MSJ Market</span>
    </footer>
</template>

<script >
import Carta_producto from '../components/Carta_producto.vue'
import Publicidad_carousel from '../components/publicidad_carousel.vue'
import Logo_con_link from '../../../modules/logo_con_link.vue'

export default {
   //Aqui tiene que nombrar el nombre de componente para llamarlo
  components: {
    Carta_producto  
  },
  data() {
    return {
      productos: [
        {
          id: 1,
          nombre: 'Pizza',
          precio: '19.90',
          imagen: pizzaImg
        },
        {
          id: 2,
          nombre: 'Pizza2',
          precio: '15.90',
          imagen: pizzaImg
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
          imagen: pizzaImg
        },
        {
          id: 5,
          nombre: 'Pizza5',
          precio: '15.90',
          imagen: pizzaImg
        }
      ]
    };
  }
};
</script>

<script setup>
import pizzaImg from '@/assets/Imagenes/pizza jamon.png'
</script>

<style scoped>
@import url('./pagina_principal.css');
</style>