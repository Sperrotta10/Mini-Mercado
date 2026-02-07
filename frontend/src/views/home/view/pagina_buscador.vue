<template>

    <!--Area de header-->
    <header_general></header_general>

    <main>
      <div class="buscador_contenido">
        <div class="buscador_header">
          <h1>Resultados para: <span>{{ termino }}</span></h1>
        </div>

        <div class="productos_grid">
          <template v-if="cargando">
            <SkeletonProductCard v-for="i in 10" :key="i" />
          </template>

          <template v-else>
            <template v-if="productos.length">
              <Carta_producto
                  v-for="producto in productos"
                  :key="producto.product_id"
                  :id="producto.product_id"
                  :imagen="producto.image"
                  :nombre="producto.name"
                  :stock="producto.stock"
                  :precio="producto.price"
                  :oferta="producto.oferta"
                :isPremium="isPremium"
              />
            </template>
            <template v-else>
              <div class="no_resultados">
                No se encontraron productos para "{{ termino }}".
              </div>
            </template>
          </template>
        </div>
      </div>
    </main>
    <!--Area de footer-->
    <FooterComponente></FooterComponente>
</template>

<script setup>
import header_general from '@/modules/header_general.vue'
import FooterComponente from '../components/Footer_Detalles.vue'
import Carta_producto from '../components/Carta_producto.vue';
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ProductService } from '@/utils/productServices'
import { useAuthStore } from '@/stores/Auth';
import SkeletonProductCard from '@/components/skeleton/SkeletonProductCard.vue';

defineProps({
  nombre: {
    type: String,
    default: '',
  },
})

const cargando = ref(true); // bandera de carga

const route = useRoute()
const productos = ref([])
const ProductServiceInstance = new ProductService()
const isPremium = ref(false);

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const termino = computed(() => {
  const raw = route.params.nombre
  return typeof raw === 'string' ? safeDecodeURIComponent(raw) : ''
})
async function buscarProductos(nombre) {
  cargando.value = true;
    if (nombre) {
        const res = await ProductServiceInstance.getProductsByName(nombre)
        productos.value = Array.isArray(res?.data) ? res.data : []
    } else {
        productos.value = []
    }
  cargando.value = false;
}

const AuthStore = useAuthStore();

onMounted(async () => {
  isPremium.value = AuthStore.userData?.suscripcion || false;
  await buscarProductos(termino.value)
})

// Observa cambios en el parámetro de la ruta y busca productos nuevos
watch(
    () => route.params.nombre,
    (nuevoNombre) => {
    if (typeof nuevoNombre === 'string') {
      buscarProductos(safeDecodeURIComponent(nuevoNombre))
      return
    }
    buscarProductos('')
    }
)
</script>

<style scoped>
main {
  background: #f7f7f7;
  min-height: 60vh;
  padding: 2rem 0;
}

.buscador_contenido {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 18px;
}

.buscador_header {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.buscador_header h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #018175;
  margin: 0;
  text-align: center;
}

.buscador_header h1 span {
  color: #004C45;
}

.productos_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 260px));
  justify-content: start;
  justify-items: stretch;
  gap: 24px;
  align-items: start;
}

.no_resultados {
  grid-column: 1 / -1;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  color: #004C45;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
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
  main { padding: 1rem 0; }
  .buscador_header h1 { font-size: 1.2rem; }
  .productos_grid { gap: 14px; }
}
</style>