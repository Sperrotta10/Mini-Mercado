<template>
  <div class="modal-overlay" @click.self="cerrar">
    <div class="modal-content">
      <button class="modal-close" @click="cerrar">&times;</button>
      <div class="procesar-carrito-wrapper">
        <h2>Procesar Carrito</h2>
        <div class="cliente-info">
          <span><strong>Cédula del cliente:</strong> {{ cedulaCliente }}</span>
          <span><strong>Nombre del Carrito:</strong> {{ carrito.name }}</span>
        </div>
        <div v-if="editableItems.length" class="carrito-table-container">
          <table class="carrito-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Disponible</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in editableItems" :key="item.item_id">
                <td>
                  <img :src="item.product.image" alt="Imagen del producto" style="width:48px; height:48px; object-fit:cover; border-radius:8px;" />
                </td>
                <td>{{ item.product.name }}</td>
                <td>{{ item.product.stock }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    :max="item.product.stock"
                    v-model.number="item.quantity"
                    class="cantidad-input"
                  />
                </td>
                <td>
                  <span v-if="ClienteIsPremium && item.product.oferta > 0">
                    <span style="text-decoration: line-through; color: #b0b0b0;">${{ item.product.price.toFixed(2) }}</span>
                    <span style="color: #10b68d; margin-left: 8px;">
                      ${{ (item.product.price * (1 - item.product.oferta / 100)).toFixed(2) }}
                    </span>
                    <span class="oferta-badge">-{{ item.product.oferta }}%</span>
                  </span>
                  <span v-else>
                    ${{ item.product.price.toFixed(2) }}
                  </span>
                </td>
                <td>
                  <span v-if="ClienteIsPremium && item.product.oferta > 0">
                    ${{ (item.product.price * (1 - item.product.oferta / 100) * item.quantity).toFixed(2) }}
                  </span>
                  <span v-else>
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <span><strong>Total:</strong> ${{ totalCarrito.toFixed(2) }}</span>
            <button class="procesar-btn" @click="procesarCarrito">Procesar compra</button>
          </div>
        </div>
        <div v-else class="carrito-vacio">
          <p>El carrito está vacío.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'


const props = defineProps({
  carrito: {
    type: Object,
    required: true
  },
  cedulaCliente: {
    type: [String, Number],
    required: true
  },
  ClienteIsPremium: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['procesar', 'close'])

// Creamos una copia reactiva de los items para edición
const editableItems = ref([])

watch(
  () => props.carrito,
  (nuevoCarrito) => {
    editableItems.value = nuevoCarrito.cartItems
      ? nuevoCarrito.cartItems.map(item => ({ ...item }))
      : []
  },
  { immediate: true }
)

const totalCarrito = computed(() =>
  editableItems.value.reduce((acc, item) => {
    if (props.ClienteIsPremium && item.product.oferta > 0) {
      return acc + (item.product.price * (1 - item.product.oferta / 100) * item.quantity)
    } else {
      return acc + (item.product.price * item.quantity)
    }
  }, 0)
)

function procesarCarrito() {
  // Devuelve el carrito modificado (solo items editados)
  emit('procesar', {
    cartItems: editableItems.value,
  })
}

function cerrar() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(16,182,141,0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
}
.modal-content {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(16,182,141,0.18);
  padding: 2rem 1rem 1rem 1rem;
  position: relative;
  max-width: 95vw;
  min-width: 320px;
  max-height: 90vh;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
}

.procesar-carrito-wrapper {
    max-width: 100vh;
    margin: 0 auto;
    background: #fff;
    border-radius: 18px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    color: #10b68d;
    margin-bottom: 1rem;
    text-align: center;
}

.cliente-info {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: #333;
    display: flex;
    flex-direction: row;
    gap: 5rem;
}

.carrito-table-container {
    width: 100%;
    overflow-x: auto;
    max-height: 340px;
    overflow-y: auto;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(16,182,141,0.08);
}

.carrito-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.carrito-table th, .carrito-table td {
    padding: 0.7rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.carrito-table th {
    background: #10b68d;
    color: #fff;
    font-weight: 600;
    padding: 0.8rem 1rem;
}

.cantidad-input {
    width: 60px;
    padding: 0.3rem 0.5rem;
    border: 1px solid #10b68d55;
    border-radius: 6px;
    font-size: 1rem;
    text-align: center;
    outline: none;
    transition: border 0.2s;
}
.cantidad-input:focus {
    border-color: #10b68d;
}

.total {
    font-size: 1.2rem;
    color: #004C45;
    margin-bottom: 1.5rem;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.procesar-btn {
    background: linear-gradient(90deg,#10b68d 0%,#4A90E2 100%);
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 0.7rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.procesar-btn:hover {
    background: #018175;
}

.carrito-vacio {
    color: #888;
    font-size: 1.1rem;
    margin-top: 2rem;
    text-align: center;
}

@media (max-width: 700px) {
    .modal-content {
        padding: 1rem 0.2rem 1rem 0.2rem;
        min-width: 90vw;
    }
    .procesar-carrito-wrapper {
        padding: 1rem;
        max-width: 98vw;
    }
    .carrito-table th, .carrito-table td {
        padding: 0.5rem 0.2rem;
        font-size: 0.95rem;
    }
    .total {
        font-size: 1rem;
    }
}

.oferta-badge {
  background: #e74c3c;
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.95rem;
  margin-left: 6px;
  font-weight: 600;
}
</style>