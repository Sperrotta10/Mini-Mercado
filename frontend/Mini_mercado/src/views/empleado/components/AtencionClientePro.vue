<template>
  <div class="carritos-usuarios">
    <h2 class="titulo">Carritos de Usuarios</h2>
    <div class="tabla-container">
      <table>
        <thead>
          <tr>
            <th>ID Carrito</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Fecha de actualización</th>
            <th>Operación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carrito in carritosPaginados" :key="carrito.cart_id">
            <td>{{ carrito.cart_id }}</td>
            <td>{{ carrito.name }}</td>
            <td>{{ carrito.user?.username || carrito.user_id }}</td>
            <td>{{ formatFecha(carrito.updatedAt) }}</td>
            <td>
              <button class="btn_ver" @click="abrirModal(carrito.cart_id)">
                <i class="fas fa-eye"></i> Ver
              </button>
            </td>
          </tr>
          <tr v-if="carritos.length === 0">
            <td colspan="5" style="text-align:center;">No hay carritos para mostrar.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Paginación -->
    <div class="paginacion" v-if="totalPaginas > 1">
      <button :disabled="paginaActual === 1" @click="paginaActual--">Anterior</button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button :disabled="paginaActual === totalPaginas" @click="paginaActual++">Siguiente</button>
    </div>
    <!-- Modal para ver items del carrito -->
    <ModalCartItems
      v-if="modalVisible"
      :carritoId="carritoSeleccionadoId"
      :visible="modalVisible"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { CartService } from '@/utils/cartService';
import ModalCartItems from '@/views/usuarios/components/ModalCartItems.vue';

const carritos = ref([]);
const paginaActual = ref(1);
const carritosPorPagina = 8;
const modalVisible = ref(false);
const carritoSeleccionadoId = ref(null);

const cartService = new CartService();

const totalPaginas = computed(() => Math.ceil(carritos.value.length / carritosPorPagina));
const carritosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * carritosPorPagina;
  return carritos.value.slice(inicio, inicio + carritosPorPagina);
});

async function cargarCarritos() {
  try {
    const res = await cartService.getAllCarts();
    console.log(res.data)
    carritos.value = res.data || [];
    paginaActual.value = 1;
  } catch (e) {
    carritos.value = [];
    console.error('Error al cargar carritos:', e);
  }
}

function abrirModal(cartId) {
  carritoSeleccionadoId.value = cartId;
  modalVisible.value = true;
}

function formatFecha(fechaIso) {
  if (!fechaIso) return '';
  const fecha = new Date(fechaIso);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

onMounted(() => {
  cargarCarritos();
});
</script>

<style scoped>
.carritos-usuarios {
  max-width: 950px;
  margin: 0 auto;
  padding: 32px 12px;
}
.titulo {
  text-align: center;
  color: #10b68d;
  margin-bottom: 32px;
  font-size: 2rem;
  font-weight: bold;
}
.tabla-container {
  background: white;
  border: 1.5px solid #10b68d22;
  border-radius: 12px;
  box-shadow: 0 5px 18px rgba(16,182,141,0.07);
  overflow-x: auto;
  margin-bottom: 18px;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}
th, td {
  padding: 13px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e7ef;
}
th {
  background-color: #f8f9fa;
  color: #10b68d;
  font-weight: 700;
  font-size: 1.08rem;
}
tr:hover {
  background-color: #f1fdfb;
}
.btn_ver {
  background: #10b68d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn_ver:hover {
  background: #018175;
}
.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 18px 0 0 0;
}
.paginacion button {
  background: #10b68d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.paginacion button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>