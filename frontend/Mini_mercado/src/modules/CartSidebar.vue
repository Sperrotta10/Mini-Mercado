<template>
  <div v-if="show" class="cart-sidebar">
    <div class="cart-header">
      <span class="cart-span">Mis Carritos</span>
      <button class="close-btn" @click="$emit('close')">&times;</button>
    </div>
    <div class="cart-content">
      <template v-if="!auth.isAuthenticated">
        <p class="cart-text">Debes iniciar sesión para ver tu carrito.</p>
        <router-link to="/login">
          <button class="btn_login">Iniciar sesión</button>
        </router-link>
      </template>
      <template v-else-if="auth.user?.role !== 'cliente'">
        <p class="cart-text">Solo los clientes pueden acceder al carrito.</p>
      </template>
      <template v-else>
        <button class="btn_add_cart" @click="showModal = true">
          <i class="fas fa-plus"></i> Agregar carrito
        </button>
        <div v-if="carritos.length === 0" class="cart-text">
          No posees carritos personalizados.
        </div>
        <div v-else class="carritos-list">
          <div v-for="carrito in carritos" :key="carrito.id" class="carrito-card">
            <div class="carrito-info">
              <span class="carrito-nombre">{{ carrito.nombre }}</span>
              <span class="carrito-detalle">Productos: {{ carrito.productos }}</span>
            </div>
            <div class="carrito-actions">
              <button class="btn_edit" @click="editarCarrito(carrito)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn_delete" @click="eliminarCarrito(carrito)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- Modal para agregar carrito -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <h3>Nuevo carrito</h3>
        <input
          v-model="nuevoCarritoNombre"
          class="modal-input"
          type="text"
          placeholder="Nombre del carrito"
          @keyup.enter="confirmarAgregarCarrito"
        />
        <div class="modal-actions">
          <button class="btn_modal" @click="confirmarAgregarCarrito">Agregar</button>
          <button class="btn_modal_cancel" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="cart-backdrop" @click="$emit('close')"></div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import { CartService } from '@/utils/cartService';
import Swal from 'sweetalert2';
const auth = useAuthStore();
const cartService = new CartService();

const carritos = ref([]);
const showModal = ref(false);
const nuevoCarritoNombre = ref('');

async function fetchCarritos() {
  if (auth.isAuthenticated && auth.user?.role === 'cliente') {
    const data = await cartService.getAllCarts();
    console.log(data);
    carritos.value = data.data.map(c => ({
      id: c.cart_id,
      nombre: c.name,
    }));
  } else {
    carritos.value = [];
  }
}
fetchCarritos();

// Modifica confirmarAgregarCarrito para mostrar un Swal si status es 401
async function confirmarAgregarCarrito() {
  const nombre = nuevoCarritoNombre.value.trim();
  if (!nombre) return;

  const nuevoCarrito = {
    name: nombre,
  };

  try {
    const response = await cartService.createCart(nuevoCarrito);
    if (response ==false) {
      Swal.fire('Límite alcanzado', 'Has alcanzado el límite de carritos permitidos.', 'warning');
    } else if (response) {
      Swal.fire('Éxito', 'Carrito agregado correctamente', 'success');
      fetchCarritos();
    } else {
      Swal.fire('Error', 'No se pudo agregar el carrito', 'error');
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      Swal.fire('Límite alcanzado', 'Has alcanzado el límite de carritos permitidos.', 'warning');
    } else {
      Swal.fire('Error', 'No se pudo agregar el carrito', 'error');
    }
  }
  closeModal();
}

function closeModal() {
  showModal.value = false;
  nuevoCarritoNombre.value = '';
}



function editarCarrito(carrito) {
  alert(`Editar carrito: ${carrito.nombre}`);
}

function eliminarCarrito(carrito) {
  if (confirm(`¿Eliminar el carrito "${carrito.nombre}"?`)) {
    carritos.value = carritos.value.filter(c => c.id !== carrito.id);
  }
}

defineProps({
  show: Boolean
});
defineEmits(['close']);
</script>

<style scoped>
.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 30vw;
    min-width: 300px;
    max-width: 400px;
    height: 100vh;
    background: #fff;
    box-shadow: -2px 0 10px rgba(0,0,0,0.15);
    z-index: 2000;
    padding: 24px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    animation: slideInCart 0.3s;
}
@keyframes slideInCart {
    from { right: -400px; }
    to { right: 0; }
}
.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;
}
.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #10b68d;
}
.cart-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.btn_login {
  margin-top: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 20px;
  background: #10b68d;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn_login:hover {
  background: #018175;
}
.btn_add_cart {
  margin-bottom: 18px;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  background: #10b68d;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-end;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn_add_cart:hover {
  background: #018175;
}
.carritos-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.carrito-card {
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 185, 93, 0.4);
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s;
}
.carrito-card:hover {
  box-shadow: 0 4px 16px rgba(16,182,141,0.13);
}
.carrito-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.carrito-nombre {
  font-weight: bold;
  color: #10b68d;
  font-size: 1.1rem;
}
.carrito-detalle {
  color: #555;
  font-size: 0.95rem;
}
.carrito-actions {
  display: flex;
  gap: 10px;
}
.btn_edit, .btn_delete {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.2s;
}
.btn_edit {
  color: #10b68d;
}
.btn_edit:hover {
  background: #e0f7f3;
}
.btn_delete {
  color: #e74c3c;
}
.btn_delete:hover {
  background: #fdecea;
}
.cart-span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
}
.cart-text {
    text-align: center;
    color: #333;
    font-size: 1rem;
    margin-top: 20px;
}
.cart-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 1500;
}
@media (max-width: 600px) {
  .cart-sidebar {
    width: 90vw;
    min-width: unset;
    max-width: unset;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 32px 24px 24px 24px;
  min-width: 280px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.modal h3 {
  margin-bottom: 18px;
  color: #10b68d;
  font-size: 1.2rem;
  text-align: center;
}
.modal-input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 18px;
  font-size: 1rem;
}
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.btn_modal {
  background: #10b68d;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn_modal:hover {
  background: #018175;
}
.btn_modal_cancel {
  background: #eee;
  color: #333;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn_modal_cancel:hover {
  background: #ddd;
}

</style>