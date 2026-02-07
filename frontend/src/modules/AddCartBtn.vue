<template>
  <div>
    <button class="btn_add_cart" @click="showModal = true">
      <i class="fas fa-plus"></i> Agregar carrito
    </button>
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
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { CartService } from '@/utils/cartService';

const emit = defineEmits(['carrito-agregado']);
const cartService = new CartService();
const showModal = ref(false);
const nuevoCarritoNombre = ref('');

async function confirmarAgregarCarrito() {
  const nombre = nuevoCarritoNombre.value.trim();
  if (!nombre) return;

  const nuevoCarrito = { name: nombre };

  try {
    const response = await cartService.createCart(nuevoCarrito);
    if (response == false) {
      Swal.fire('Límite alcanzado', 'Para tener más carritos, mejore su suscripción.', 'warning');
    } else if (response) {
      Swal.fire('Éxito', 'Carrito agregado correctamente', 'success');
      emit('carrito-agregado');
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
</script>

<style scoped>
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
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1100;
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