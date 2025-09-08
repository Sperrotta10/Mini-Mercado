<template>
    <!--Area de header-->
    <header_general></header_general>

    <main>
        <div class="categoria-header">
            <h1>Categoría: {{ nombreCategoría }}</h1>
        </div>
        <div v-if="!cargando" class="productos-grid">
            <Carta_producto
                v-for="producto in productos"
                :key="producto.product_id"
                :id="producto.product_id"
                :imagen="producto.image"
                :nombre="producto.name"
                :stock="producto.stock"
                :precio="producto.price"
                :oferta="producto.oferta"
                :isPremium=isPremium
            />
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
import Carta_producto from '../components/Carta_producto.vue';
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {categoryService} from '@/utils/categoryServices'
import { ProductService } from '@/utils/productServices';
import { useAuthStore } from '@/stores/Auth';
const ProductServiceInstance = new ProductService();
const route = useRoute()
const AuthStore = useAuthStore();

const productos = ref([])
const nombreCategoría = ref('')
const isPremium = ref(false)
const cargando = ref(true); // bandera de carga
async function buscarCategorias(id) {
    if (id) {
        const res = await categoryService.getCategoryById(id)
        nombreCategoría.value = res.data.name
        const categoryProducts = await ProductServiceInstance.getProductsPaginated(1, 100, 0, 1000, 0, res.data.categoria_id)
        console.log(categoryProducts)
        if (categoryProducts) {
            productos.value = categoryProducts.data.products
        } else {
            productos.value = []
        }
    } else {
        productos.value = []
    }
    cargando.value=false;

}

onMounted(async () => {
    await AuthStore.GetThisUserData(); // Si tienes este método
    isPremium.value = AuthStore.userData?.suscripcion == 1 || AuthStore.userData?.suscripcion === true;
    buscarCategorias(route.params.id || '');
    console.log('En Pagina Categoria', isPremium.value, typeof isPremium.value);
});

// Observa cambios en el parámetro de la ruta y busca productos nuevos
watch(
    () => route.params.id,
    (nuevoId) => {
        buscarCategorias(nuevoId || '')
    }
)
</script>

<style scoped>
main {
  background: #f7f7f7;
  min-height: 60vh;
  padding: 2rem 0;
}

.categoria-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.categoria-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #10b68d;
  margin: 0;
  text-align: center;
  letter-spacing: 1px;
  background: #fff;
  padding: 1rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(16,182,141,0.10);
}

.productos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
}

/* Responsive */
@media (max-width: 700px) {
  .categoria-header h1 {
    font-size: 1.3rem;
    padding: 0.7rem 1.2rem;
  }
  .productos-grid {
    gap: 1rem;
  }
}
</style>