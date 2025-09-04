<template>

    <!--Area de header-->
    <header_general></header_general>

    <main>
        <Carta_producto
            v-for="producto in productos"
            :key="producto.product_id"
            :id="producto.product_id"
            :imagen="producto.image"
            :nombre="producto.name"
            :stock="producto.stock"
            :precio="producto.price"
        />
    </main>
    
    <!--Area de presentacion de MSJ Market-->
    <PresentacionMarket></PresentacionMarket>
    
    <!--Area de footer-->
    <FooterComponente></FooterComponente>
</template>

<script setup>
import header_general from '@/modules/header_general.vue'
import FooterComponente from '../components/Footer_Detalles.vue'
import Carta_producto from '../components/Carta_producto.vue';
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ProductService } from '@/utils/productServices'

const route = useRoute()
const productos = ref([])
const ProductServiceInstance = new ProductService()

async function buscarProductos(nombre) {
    if (nombre) {
        const res = await ProductServiceInstance.getProductsByName(nombre)
        if (res) {
            productos.value = res.data
        } else {
            productos.value = []
        }
    } else {
        productos.value = []
    }
}

onMounted(() => {
    buscarProductos(route.params.nombre || '')
})

// Observa cambios en el parámetro de la ruta y busca productos nuevos
watch(
    () => route.params.nombre,
    (nuevoNombre) => {
        buscarProductos(nuevoNombre || '')
    }
)
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem 0;
  background: #f7f7f7;
  min-height: 60vh;
}

/* Si necesitas personalizar la carta, puedes usar esta clase en Carta_producto.vue */
.carta-producto {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1.5px 6px rgba(16,182,141,0.08);
  padding: 1.5rem 1.2rem;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s, box-shadow 0.18s;
  position: relative;
}

.carta-producto:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 8px 32px rgba(16,182,141,0.18), 0 2px 8px rgba(0,0,0,0.10);
}

.carta-producto img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 12px;
  background: #f0f0f0;
}

.carta-producto .nombre {
  font-size: 1.1rem;
  font-weight: 700;
  color: #10b68d;
  margin-bottom: 0.5rem;
  text-align: center;
}

.carta-producto .precio {
  font-size: 1.2rem;
  color: #004C45;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.carta-producto .stock {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 1rem;
}

.carta-producto button {
  background: #10b68d;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.carta-producto button:hover {
  background: #018175;
}

@media (max-width: 700px) {
  main {
    gap: 1rem;
    padding: 1rem 0;
  }
  .carta-producto {
    width: 95vw;
    max-width: 340px;
  }
}
</style>