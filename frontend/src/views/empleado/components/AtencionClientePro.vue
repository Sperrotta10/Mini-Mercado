<template>
  <div class="carritos-usuarios">
    <h2 class="titulo">Carritos de Usuarios</h2>
    <div class="busqueda-cedula">
      <input
        v-model="cedula"
        type="text"
        maxlength="8"
        placeholder="Ingrese cédula (Ej: 12345678)"
        @input="soloNumeros"
        class="input-cedula"
      />
      <button class="btn-buscar" @click="buscarCarritos">Buscar</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
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
            <td>{{ username || carrito.user_id }}</td>
            <td>{{ formatFecha(carrito.updatedAt) }}</td>
            <td>
              <button class="btn_ver" @click="verCarrito(carrito, cedula.value,ClienteIsPremium.value)">
                <i class="fas fa-eye"></i> Ver
              </button>
            </td>
          </tr>
          <tr v-if="carritos.length === 0">
            <td colspan="5" style="text-align:center;">No hay carritos para mostrar.</td>
          </tr>
        </tbody>
      </table>
      <ProcesarCarrito
        v-if="mostrarProcesar"
        :carrito="carritoSeleccionado"
        :cedulaCliente="cedulaSeleccionada"
        :ClienteIsPremium="ClienteIsPremium"
        @procesar="procesarCompra"
        @close="cerrarModal"
      />
    </div>
    <!-- Paginación -->
    <div class="paginacion" v-if="totalPaginas > 1">
      <button :disabled="paginaActual === 1" @click="paginaActual--">Anterior</button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button :disabled="paginaActual === totalPaginas" @click="paginaActual++">Siguiente</button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { UserService } from '@/utils/userServices';
import ProcesarCarrito from './ProcesarCarrito.vue';
import { ProductService } from '@/utils/productServices';
import Swal from 'sweetalert2'; 

const productServiceInstance = new ProductService();
const username = ref('');
const carritos = ref([]);
const paginaActual = ref(1);
const carritosPorPagina = 8;
const userServiceInstance = new UserService();
const carritoSeleccionado = ref([]);
const cedulaSeleccionada = ref('');
const mostrarProcesar = ref(false);
const cedula = ref('');
const error = ref('');
const ClienteIsPremium = ref(false);
const totalPaginas = computed(() => Math.ceil(carritos.value.length / carritosPorPagina));
const carritosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * carritosPorPagina;
  return carritos.value.slice(inicio, inicio + carritosPorPagina);
});

function soloNumeros(e) {
  let valor = e.target.value.replace(/[^\d]/g, '');
  if (valor.length > 8) {
    valor = valor.slice(0, 8);
  }
  cedula.value = valor;
}

function verCarrito(carrito) {
  carritoSeleccionado.value = carrito; 
  mostrarProcesar.value = true;
}

async function procesarCompra({ cartItems }) {
  let exito = true;
  for (const item of cartItems) {
    try {
      const newproductStock = String(item.product.stock - item.quantity);
      const response = await productServiceInstance.patchProduct(item.product_id, { stock: newproductStock });

      if (response?.status === 400) {
        exito = false;
        Swal.fire({
          icon: 'error',
          title: 'Stock insuficiente',
          text: `No hay suficiente stock para el producto ${item.product.name}.`,
        });
      }
    } catch (e) {
      exito = false;
      console.error(`Error al actualizar el stock del producto ${item.product_id}:`, e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se pudo procesar el producto ${item.product.name}.`,
      });
    }
  }
  if (exito) {
    Swal.fire({
      icon: 'success',
      title: 'Compra procesada',
      text: 'El carrito fue procesado correctamente.',
      timer: 2000,
      showConfirmButton: false
    });
    cerrarModal();
    await buscarCarritos();
  }
}

async function buscarCarritos() {
  error.value = '';
  if (!cedula.value || cedula.value.length < 1 || cedula.value.length > 8) {
    error.value = 'Ingrese una cédula válida (1 a 8 números).';
    carritos.value = [];
    return;
  }
  try {
    const res = await userServiceInstance.getCartsByCedula(cedula.value);
    cedulaSeleccionada.value = cedula.value;
    carritos.value = res.data?.carts || [];
    username.value = res.data?.username || '';
    ClienteIsPremium.value = res.data?.suscripcion || false;
    paginaActual.value = 1;
    if (carritos.value.length === 0) {
      error.value = 'No hay carritos para esta cédula.';
    }
  } catch (e) {
    carritos.value = [];
    error.value = 'Error al buscar carritos.';
    console.error('Error al cargar carritos:', e);
  }
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

function cerrarModal() {
  mostrarProcesar.value = false;
}
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
.busqueda-cedula {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
  justify-content: center;
}
.input-cedula {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1.5px solid #10b68d55;
  background: #fff;
  font-size: 1.08rem;
  color: #222;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(16,182,141,0.04);
  width: 220px;
}
.input-cedula:focus {
  border-color: #10b68d;
  box-shadow: 0 0 0 2px #10b68d22;
}
.btn-buscar {
  background: #10b68d;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.08rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-buscar:hover {
  background: #018175;
}
.error {
  color: #e74c3c;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
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