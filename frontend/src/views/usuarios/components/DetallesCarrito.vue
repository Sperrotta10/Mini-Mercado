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
            v-if="producto.item_data.imagen"
            :src="producto.item_data.imagen"
            alt="Imagen"
            class="producto-imagen"
            style="width:60px; height:60px; object-fit:cover; border-radius:8px; margin-right:5px;"
          />
          <div class="producto-info">
            <span class="producto-nombre">{{ producto.item_data.nombre }}</span>
            <span v-if="isPremium && producto.item_data.oferta > 0" class="producto-precio-oferta">
              <span class="precio-original">{{ currency(producto.item_data.precio) }}</span>
              <span class="precio-oferta">
                {{ currency(producto.item_data.precio * (1 - producto.item_data.oferta / 100)) }}
              </span>
              <span class="oferta-badge">-{{ producto.item_data.oferta }}%</span>
            </span>
            <span v-else class="producto-precio">{{ currency(producto.item_data.precio) }}</span>
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
    <button class="btn_guardar" @click="guardarCambios">Guardar cambios</button>

  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CartItemService } from '@/utils/cartItemService';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const isPremium = authStore.userData?.suscripcion || false;

const route = useRoute();
const router = useRouter();
const cartItemService = new CartItemService();
const nombreCarrito = ref(route.query.nombre || 'Sin nombre');
const productos = ref([]);
const productosOriginales = ref([]); // <-- Guarda el estado original

async function fetchCartItems() {
  try {
    const cartId = route.params.id; 
    if (cartId) {
      const data = await cartItemService.getAllCartItems(cartId);
      if (!data) {
        productos.value = [];
        productosOriginales.value = [];
        return;
      }
      const items = data.data.map(item => (
        {
          item_id: item.item_id,
          cantidad: item.quantity,
          item_data:{  
            id: item.product.product_id,
            nombre: item.product.name,
            precio: item.product.price,
            imagen: item.product.image ,
            oferta: item.product.oferta
          }
        }
      ));
      productos.value = items;
      productosOriginales.value = JSON.parse(JSON.stringify(items));
    }
  } catch (error) {
    console.error('Error al cargar los productos del carrito:', error);
    productos.value = [];
    productosOriginales.value = [];
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

async function eliminarProducto(producto) {
  const confirm = await Swal.fire({
    title: `¿Eliminar "${producto.item_data.nombre}"?`,
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#10b68d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
  if (confirm.isConfirmed) {
    productos.value = productos.value.filter(p => p.item_id !== producto.item_id);
    await cartItemService.deleteCartItem(producto.item_id);
    Swal.fire('Eliminado', 'El producto fue eliminado del carrito.', 'success');
  }
}

function currency(value) {
  return '$' + Number(value).toFixed(2);
}

// --- GUARDAR CAMBIOS ---
async function guardarCambios() {
  // 1. Productos eliminados
  const eliminados = productosOriginales.value.filter(
    orig => !productos.value.some(p => p.item_id === orig.item_id)
  );
  // 2. Productos con cantidad cambiada
  const modificados = productos.value.filter(
    p => {
      const orig = productosOriginales.value.find(o => o.item_id === p.item_id);
      return orig && orig.cantidad !== p.cantidad;
    }
  );

  if (eliminados.length === 0 && modificados.length === 0) {
    await Swal.fire('Sin cambios', 'No hay cambios para guardar.', 'info');
    return;
  }

  const confirm = await Swal.fire({
    title: '¿Guardar cambios?',
    text: 'Se actualizarán los productos modificados y se eliminarán los eliminados.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10b68d',
    cancelButtonColor: '#e74c3c',
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;

  // Eliminar productos
  for (const prod of eliminados) {
    await cartItemService.deleteCartItem(prod.item_id);
  }
  // Actualizar cantidades
  for (const prod of modificados) {
    await cartItemService.updateCartItem(prod.item_id, { quantity: prod.cantidad });
  }

  await Swal.fire('¡Listo!', 'Los cambios se guardaron correctamente.', 'success');
  router.push({ name: 'Gestion_Carrito' });
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

.btn_guardar {
  margin: 24px auto 0 auto;
  display: block;
  background: #10b68d;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn_guardar:hover {
  background: #018175;
}

.producto-precio-oferta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}
.precio-original {
  text-decoration: line-through;
  color: #888;
  font-size: 1rem;
}
.precio-oferta {
  color: #10b68d;
  font-size: 1.1rem;
  font-weight: bold;
}
.oferta-badge {
  background: #e74c3c;
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.95rem;
  margin-left: 4px;
  font-weight: 600;
}
</style>