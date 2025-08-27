<template>
  <div id="inventory" class="page">
    <div class="card">
      <div class="card-header">
        <h3>Inventario</h3>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nombre de producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Mínimo stock</th>
                <th>Estado de cantidad</th>
                <th>Operación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="producto in productosPaginados" :key="producto.product_id">
                <td>{{ producto.name }}</td>
                <td>{{ producto.categoria_id }}</td>
                <td>{{ producto.stock }}</td>
                <td>{{ producto.stock_min }}</td>
                <td>
                  <div class="progress-container">
                    <div
                      class="progress-bar"
                      :class="getBarClass(producto)"
                      :style="{ width: getBarWidth(producto) }"
                    ></div>
                  </div>
                  <small>{{ getEstadoStock(producto) }}</small>
                </td>
                <td class="contendor_separador">
                  <button class="btn_general" @click="abrirModal(producto.product_id)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn_general" @click="eliminarProducto(producto)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="productos.length === 0">
                <td colspan="6" style="text-align:center;">No hay productos para mostrar.</td>
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
      </div>
    </div>

    <!-- Modal de edición -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-backdrop" @click.self="cerrarModal">
        <div class="modal-content">
          <button class="modal-close" @click="cerrarModal">×</button>
          <h3>Editar producto</h3>
          <div class="modal-form">
            <label>Nombre:</label>
            <input v-model="productoEdit.name" type="text" />

            <label>Categoría ID:</label>
            <input v-model.number="productoEdit.categoria_id" type="number" min="1" />

            <label>Precio:</label>
            <input v-model.number="productoEdit.price" type="number" min="0" step="0.01" />

            <label>Oferta (%):</label>
            <input v-model.number="productoEdit.oferta" type="number" min="0" max="100" />

            <label>Stock:</label>
            <input v-model.number="productoEdit.stock" type="number" min="0" />

            <label>Mínimo stock:</label>
            <input v-model.number="productoEdit.stock_min" type="number" min="0" />

            <label>Imagen (URL):</label>
            <input v-model="productoEdit.image" type="text" />

            <label>Estado:</label>
            <select v-model="productoEdit.status">
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>

            <div v-if="productoEdit.image" style="margin:10px 0;">
              <img :src="productoEdit.image" alt="Imagen producto" style="max-width:120px;max-height:120px;border-radius:8px;">
            </div>

            <button class="btn_general" @click="guardarEdicion">Guardar</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { ProductService } from '@/utils/productServices';

const productos = ref([]);
const showModal = ref(false);
const productoEdit = ref({});
const productService = new ProductService();

// Paginación
const paginaActual = ref(1);
const productosPorPagina = 5;
const totalPaginas = computed(() => Math.ceil(productos.value.length / productosPorPagina));
const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * productosPorPagina;
  return productos.value.slice(inicio, inicio + productosPorPagina);
});

async function cargarProductos() {
  try {
    const res = await productService.getProducts();
    productos.value = (res.data || []).map(p => ({
      ...p,
    }));
    paginaActual.value = 1;
  } catch (e) {
    productos.value = [];
    console.error('Error al cargar productos:', e);
  }
}

// Carga los datos del producto por ID antes de abrir el modal
async function abrirModal(productoId) {
  try {
    const res = await productService.getProductById(productoId);
    if (res && res.data) {
      productoEdit.value = { ...res.data };
      showModal.value = true;
    } else {
      Swal.fire('Error', 'No se pudo cargar el producto.', 'error');
    }
  } catch (e) {
    console.log(e);
    Swal.fire('Error', 'No se pudo cargar el producto.', 'error');
  }
}

function cerrarModal() {
  showModal.value = false;
  productoEdit.value = {};
}
async function guardarEdicion() {
  try {
    await productService.update(productoEdit.value.product_id, {
      name: productoEdit.value.name,
      categoria_id: productoEdit.value.categoria_id,
      price: productoEdit.value.price,
      oferta: productoEdit.value.oferta,
      stock: productoEdit.value.stock,
      stock_min: productoEdit.value.stock_min,
      image: productoEdit.value.image,
      status: productoEdit.value.status
    });
    Swal.fire('¡Listo!', 'Producto editado correctamente.', 'success');
    await cargarProductos();
    cerrarModal();
  } catch (e) {
    console.log(e);
    Swal.fire('Error', 'No se pudo editar el producto.', 'error');
  }
}
async function eliminarProducto(producto) {
  const confirm = await Swal.fire({
    title: `¿Eliminar "${producto.name}"?`,
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#10b68d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
  if (confirm.isConfirmed) {
    try {
      await productService.delete(producto.product_id);
      Swal.fire('Eliminado', 'El producto fue eliminado.', 'success');
      await cargarProductos();
    } catch (e) {
        console.log(e);
        Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
    }
  }
}

function getBarWidth(producto) {
  const percent = Math.min(100, Math.round((producto.stock / producto.stock_min) * 100));
  return percent + '%';
}
function getBarClass(producto) {
  if (producto.stock < producto.stock_min * 0.5) return 'bg-danger';
  if (producto.stock < producto.stock_min) return 'bg-warning';
  return 'bg-success';
}
function getEstadoStock(producto) {
  if (producto.stock < producto.stock_min * 0.5) return 'Muy bajo';
  if (producto.stock < producto.stock_min) return 'Bajo';
  return 'Bien';
}

onMounted(() => {
  cargarProductos();
});
</script>

<style scoped>
/* Css para el diseño */
.card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    overflow: hidden;
}

.card-header {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    font-size: 1.3rem;
    color: var(--dark);
}

.card-body {
    padding: 20px;
}

/* La tabla */
.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

th {
    background-color: #f8f9fa;
    color: var(--dark);
    font-weight: 600;
}

tr:hover {
    background-color: rgba(67, 97, 238, 0.03);
}

/* Simulacion de para representar la cantidad de producto */
.progress-container {
    background: #e9ecef;
    border-radius: 5px;
    height: 10px;
    margin-top: 8px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    border-radius: 5px;
}

.bg-success {
    background: #4cc9f0;
}

.bg-warning {
    background: #ff9e00;
}

.bg-danger {
    background: #f72585;
}

.contendor_separador{
    width: 100%;
    display: flex;
    gap: 20px;
}

.btn_general{
    background-color: #10b68d;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
}

.btn_general i{
    color: white;
}

/* Estilos para el modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35); /* Más oscuro para mejor contraste */
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #f8fafc; /* Fondo más claro y suave */
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(16,182,141,0.22);
  padding: 36px 28px 28px 28px;
  min-width: 340px;
  max-width: 98vw;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  border: 1.5px solid #10b68d22;
}
.modal-close {
  position: absolute;
  top: 14px;
  right: 22px;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #10b68d;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #018175;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}

.modal-form label {
  font-weight: 600;
  color: #10b68d;
  margin-bottom: 4px;
  margin-top: 2px;
  letter-spacing: 0.5px;
}

.modal-form input,
.modal-form select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.5px solid #e0e7ef;
  background: #fff;
  font-size: 1rem;
  color: #222;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  margin-bottom: 2px;
  box-shadow: 0 1px 2px rgba(16,182,141,0.04);
}

.modal-form input:focus,
.modal-form select:focus {
  border-color: #10b68d;
  box-shadow: 0 0 0 2px #10b68d22;
}

.modal-form button.btn_general {
  margin-top: 12px;
  background: linear-gradient(90deg, #10b68d 60%, #4cc9f0 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(16,182,141,0.10);
}

.modal-form button.btn_general:hover {
  background: linear-gradient(90deg, #018175 60%, #4cc9f0 100%);
}

.modal-form img {
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  border: 1.5px solid #10b68d33;
  box-shadow: 0 2px 8px rgba(16,182,141,0.10);
  background: #fff;
  padding: 4px;
}

/* Paginación */
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