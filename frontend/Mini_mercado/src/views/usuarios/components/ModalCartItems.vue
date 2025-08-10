<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <button class="modal-close" @click="close">×</button>
        <h3>Productos del carrito</h3>
        <div v-if="loading" class="modal-loading">Cargando...</div>
        <div v-else-if="items.length === 0" class="modal-empty">No hay productos en este carrito.</div>
        <div v-else class="modal-items-list">
          <div v-for="item in items" :key="item.id" class="modal-item">
            <img v-if="item.imagen" :src="item.imagen" alt="Imagen" class="modal-item-img" />
            <div class="modal-item-info">
              <div class="modal-item-nombre">{{ item.nombre }}</div>
              <div class="modal-item-precio">Precio: ${{ item.precio }}</div>
              <div class="modal-item-cantidad">Cantidad: {{ item.cantidad }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { CartItemService } from '@/utils/cartItemService';
import { onMounted } from 'vue';

onMounted(() => {
  if (props.visible && props.carritoId) {
    fetchItems();
  }
});

const props = defineProps({
  carritoId: { type: Number, required: true },
  visible: { type: Boolean, required: true }
});
const emit = defineEmits(['close']);
const items = ref([]);
const loading = ref(false);

function close() {
  emit('close');
}

async function fetchItems() {
  loading.value = true;
  items.value = [];
  try {
    const cartItemService = new CartItemService();
    const data = await cartItemService.getAllCartItems(props.carritoId);
    if (data && data.data) {
      items.value = data.data.map(item => ({
        id: item.product.product_id,
        nombre: item.product.name,
        precio: item.product.price,
        cantidad: item.quantity,
        imagen: item.product.image
      }));
    }
  } catch (e) {
    items.value = [];
    throw(e);
  } finally {
    loading.value = false;
  }
}


</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(16,182,141,0.18);
  padding: 32px 24px 24px 24px;
  min-width: 320px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #10b68d;
  cursor: pointer;
}
.modal-loading,
.modal-empty {
  text-align: center;
  color: #888;
  margin: 30px 0;
}
.modal-items-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}
.modal-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 12px 16px;
}
.modal-item-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}
.modal-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.modal-item-nombre {
  font-weight: bold;
  color: #10b68d;
}
.modal-item-precio,
.modal-item-cantidad {
  font-size: 0.98rem;
  color: #555;
}
</style>