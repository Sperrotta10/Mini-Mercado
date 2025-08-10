<template>
  <div class="detalle-carrito">
    <h2 class="titulo">{{ nombreCarrito }}</h2>
    <div v-if="productos.length === 0" class="no-productos">
      <p>Este carrito no tiene productos.</p>
    </div>
    <div v-else class="productos-grid">
      <div v-for="producto in productos" :key="producto.id" class="producto-card">
        <div class="producto-row">
          <img
            v-if="producto.imagen"
            :src="producto.imagen"
            alt="Imagen"
            class="producto-imagen"
            style="width:60px; height:60px; object-fit:cover; border-radius:8px; margin-right:5px;"
          />
          <div class="producto-info">
            <span class="producto-nombre">{{ producto.nombre }}</span>
            <span class="producto-precio">{{ currency(producto.precio) }}</span>
          </div>
          <div class="producto-actions">
            <button class="btn_counter" @click="disminuirCantidad(producto)" :disabled="producto.cantidad <= 1">-</button>
            <span class="producto-cantidad">{{ producto.cantidad }}</span>
            <button class="btn_counter" @click="aumentarCantidad(producto)">+</button>
            <button class="btn_eliminar" @click="eliminarProducto(producto)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { CartItemService } from '@/utils/cartItemService';
import { onMounted } from 'vue';

const route = useRoute();
const cartItemService = new CartItemService();
const nombreCarrito = ref(route.query.nombre || 'Sin nombre');
const productos = ref([{}]);

async function fetchCartItems() {
  try {
    const cartId = route.params.id; 
    if (cartId) {
      const data = await cartItemService.getAllCartItems(cartId);
      if (!data) {
        productos.value = [];
        return;
      }
      const items = data.data;
      productos.value = items.map(item => ({
        id: item.product.product_id,
        nombre: item.product.name,
        precio: item.product.price,
        cantidad: item.quantity,
        imagen: item.product.image 
      }));
    }
  } catch (error) {
    console.error('Error al cargar los productos del carrito:', error);
    productos.value = [];
  }
}

onMounted(() => {
  fetchCartItems();
});

function aumentarCantidad(producto) {
  producto.cantidad++;
}
function disminuirCantidad(producto) {
  if (producto.cantidad > 1) {
    producto.cantidad--;
  }
}
function eliminarProducto(producto) {
  productos.value = productos.value.filter(p => p.id !== producto.id);
}
function currency(value) {
  return '$' + Number(value).toFixed(2);
}
</script>

<style scoped>
.detalle-carrito {
  max-width: 800px;
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
.no-productos {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-top: 40px;
}
.productos-grid {
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  align-items: center;
}
.producto-card {
  background: #f7f7f7;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(16,182,141,0.10);
  padding: 18px 24px;
  min-width: 320px;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.producto-card:hover {
  box-shadow: 0 8px 24px rgba(16,182,141,0.18);
}
.producto-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
}
.producto-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 120px;
}
.producto-nombre {
  font-size: 1.1rem;
  font-weight: bold;
  color: #10b68d;
}
.producto-precio {
  color: #555;
  font-size: 1rem;
}
.producto-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn_counter {
  background: #e0f7f3;
  color: #10b68d;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn_counter:disabled {
  background: #eee;
  color: #bbb;
  cursor: not-allowed;
}
.btn_counter:hover:not(:disabled) {
  background: #b2f0e7;
}
.producto-cantidad {
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
}
.btn_eliminar {
  background: #fdecea;
  color: #e74c3c;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn_eliminar:hover {
  background: #f8d7da;
}
@media (max-width: 700px) {
  .detalle-carrito {
    padding: 18px 2vw;
  }
  .producto-card {
    min-width: 90vw;
    max-width: 98vw;
    padding: 14px 6px;
  }
  .producto-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .producto-actions {
    justify-content: flex-start;
    gap: 8px;
  }
}
</style>