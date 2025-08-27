<template>
    <div class="contenedor_publicidad">
        <div class="contenedor_carousel">

        <TransitionGroup name="grupo_slide">
          <div v-for="(slide, index) in slides" :key="index" class="slide" v-show="Imagen_referencia_Index=== index">
            <img :src="slide.imagen" :alt="slide.titulo_nombre" class="imagen_publicidad">
            <div class="slide_interaccion">
              <h3>{{ slide.titulo_nombre }}</h3>
              <p>{{ slide.descripcion }}</p>
              <button @click="goToProducto_link(slide.link)">¡Compra!</button>
            </div>
          </div>
        </TransitionGroup>

        <div class="controls">
          <button class="control-btn prev" @click="anterior">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button class="control-btn next" @click="siguiente">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div class="indicador">
          <span 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="goTo(index)"
            :class="{ active: Imagen_referencia_Index === index }"
          ></span>
        </div>

    </div>
    </div>
    
</template>

<script setup>
//Imagenes
import Imagen_cocacola from '@/assets/Imagenes/publicidad_carousel/cocacola.png'
import Imagen_dorito from '@/assets/Imagenes/publicidad_carousel/doritos.jpg'
import Imagen_pina from '@/assets/Imagenes/publicidad_carousel/fanta_pina.jpg'

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const Imagen_referencia_Index = ref(0)
const interval = ref(null)

const slides = [
  {
    imagen: Imagen_cocacola,
    titulo_nombre: 'Coco cola',
    descripcion: 'Oferta!',
    link: '/producto_1'
  },
  {
    imagen: Imagen_dorito,
    titulo_nombre: 'Nuevo dorito',
    descripcion: 'sabroso',
    link: '/producto_1'
  },
  {
    imagen: Imagen_pina,
    titulo_nombre: 'Fanta! Piña!',
    descripcion: 'Nuevo sabor',
    link: '/producto_1'
  }
]

const AutoPoner = () => {
  interval.value = setInterval(() => {
    siguiente()
  }, 5000)
}

const siguiente = () => {
  Imagen_referencia_Index.value = (Imagen_referencia_Index.value + 1) % slides.length
}

const anterior = () => {
  Imagen_referencia_Index.value = (Imagen_referencia_Index.value - 1 + slides.length) % slides.length
}

const goTo = (index) => {
  Imagen_referencia_Index.value = index
}

const goToProducto_link = (link) => {
  router.push(link)
}

onMounted(() => {
  AutoPoner()
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

</script>

<style scoped>

.contenedor_publicidad {
  position: relative;
  max-width: 90%;
  margin: 15px auto;
  overflow: hidden;
}

.imagen_publicidad{
    width: 100%;
    height: 100%;
}

.contenedor_carousel {
  position: relative;
  height: 70vh;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide_interaccion {
  position: absolute;
  bottom: 10%;
  left: 5%;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 20px;
  max-height: 40%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.slide_interaccion button{
  height: 30px;
  padding: 5px 25px;
  text-align: center;
  background-color: #10b68d;
  border: none;
  border-radius: 30px;  
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.slide_interaccion button:hover{
  background-color: #018175;
}

.controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 10px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: white;
  transform: scale(1.1);
}

/*Para animacion */
.grupo_slide-enter-active,
.grupo_slide-leave-active {
  transition: opacity 0.5s ease;
}

.grupo_slide-enter-from,
.grupo_slide-leave-to {
  opacity: 0;
}

.indicador {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicador span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicador span.active {
  background: white;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .contenedor_carousel {
    height: 300px;
  }
  
  .slide_interaccion {
    max-width: 70%;
    bottom: 20px;
    left: 15px;
    padding: 12px;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: row;
  }
  
  .slide_interaccion h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  .slide_interaccion p {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
  
  .slide_interaccion button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
  
  .control-btn {
    width: 36px;
    height: 36px;
  }
  
  .indicador {
    bottom: 15px;
  }
}

@media (max-width: 480px) {
  .contenedor_carousel {
    height: 300px;
  }
  
  .slide_interaccion {
    position: absolute; 
    max-width: 80%;
    bottom: 30px;
    left: 10px;
    padding: 10px;
    background: rgba(0,0,0,0.85);
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  
  .slide_interaccion h3 {
    font-size: 1rem;
  }
  
  .slide_interaccion p {
    font-size: 0.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .slide_interaccion button {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  
  .control-btn {
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.9);
  }
  
  .indicador span {
    width: 10px;
    height: 10px;
  }
}
</style>