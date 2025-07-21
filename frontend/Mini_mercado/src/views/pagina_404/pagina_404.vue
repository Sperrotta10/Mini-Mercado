<template>
  <div class="pagina-404">
    <div class="header">
      <logo_con_link class="logo"/>
      <h1>Vaya, ¿la página se viajo?👻</h1>
    </div>

    <div class="contenedor_main_contenido">
      <div class="ilustracion">
        <img src="@/assets/Imagenes/carrito404.png" alt="logo" class="carrito_404_icon">
        <div class="objetos_item manzana"></div>
        <div class="objetos_item naranja"></div>
      </div>

      <div class="accion_area">
        <p class="descripcion">
          ¡Vamos a elegir otra cosa!
        </p>

        <router-link to="/" class="btn_home">
          <i class="fas fa-home margin_extra"></i> Regresar pagina principal
        </router-link>
      </div>
    </div>

    <div class="footer">
      <p>MSJ Market</p>
    </div>

  </div>
</template>

<script setup>
import Logo_con_link from '../../modules/logo_con_link.vue'

</script>

<style scoped>
/*Plantilla de colores: para guiar bien las cosas*/
.plantilla_COLORES {
    color: #004C45;
    color: #018175;
    color: #10b68d;
    color: #94dd8b;
    color: #fee3b2;
}

.pagina-404 {
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  width: auto;
  height: 70px;
  margin-bottom: 1rem;
}

h1 {
  color: #004C45;
  margin: 0;
  font-size: 2.2rem;
}

.contenedor_main_contenido {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.ilustracion {
  position: relative;
  width: 400px;
  height: 300px;
  margin-right: 2rem;
}

.carrito_404_icon {
  width: 200px;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.objetos_item {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: bounce 2s infinite ease-in-out;
}

.manzana {
  background: url('@/assets/Imagenes/productos/manzana.png') no-repeat center/contain;
  top: 45%;
  left: 2%;
  animation-delay: 0.3s;
}

.naranja {
  background: url('@/assets/Imagenes/productos/naranja.png') no-repeat center/contain;
  top: 50%;
  left: 45%;
  animation-delay: 0.6s;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.accion_area {
  max-width: 400px;
}

.descripcion {
  color: #004C45;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn_home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #10b68d;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px #004C45;
  margin-bottom: 20px;
}

.margin_extra{
  margin-right: 10px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #004C45;
  color: white;
  text-align: center;
  padding: 1rem;
  font-weight: bold;
}
</style>