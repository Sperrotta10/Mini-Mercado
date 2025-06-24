<template>
    <div class="contenedor_publicidad">
        <div class="contenedor_carousel">
        <img :src="Imagen_cocacola" alt="cocacola" class="imagen_publicidad">
          <div class="slide">
            <h3>cocacola</h3>
            <p>Sabroso, barato</p>
            <button>¡comprar!</button>
          </div>
    </div>
    </div>
    
</template>

<script setup>
import Imagen_cocacola from '@/assets/Imagenes/cocacola.png'

</script>

<style scoped>

.contenedor_publicidad {
  position: relative;
  max-width: 90%;
  margin: 15px auto;
  overflow: hidden;
  touch-action: pan-y;
}

.imagen_publicidad{
    width: 100%;
    height: 100%;
}

.contenedor_carousel {
  position: relative;
  height: 400px;
}

.slide {
  position: absolute;
  bottom: 10%;
  left: 10%;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 15px;
  max-width: 50%;
  border-radius: 8px;
}
</style>