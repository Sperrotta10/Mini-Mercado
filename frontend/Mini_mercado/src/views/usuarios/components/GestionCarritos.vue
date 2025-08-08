<template>
    <div class="gestion-carritos">
        <h2 class="titulo">Mis Carritos</h2>
        <div v-if="carritos.length === 0" class="no-carritos">
            <p>No tienes carritos guardados.</p>
        </div>
        <div v-else class="carritos-grid">
            <div v-for="carrito in carritos" :key="carrito.cart_id" class="carrito-card">
                <div class="carrito-header">
                    <span class="carrito-nombre">{{ carrito.name }}</span>
                    <span class="carrito-productos">
                      Última actualización: {{ formatFecha(carrito.updatedAt) }}
                    </span>                </div>
                <div class="carrito-actions">
                    <button class="btn_ver" @click="verCarrito(carrito)">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button class="btn_edit" @click="editarCarrito(carrito)">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn_delete" @click="eliminarCarrito(carrito)">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { CartService } from '@/utils/cartService';

const router = useRouter();
const cartService = new CartService();
const carritos = ref([{}]);

async function fetchCarritos() {
    const data = await cartService.getAllCarts();
    carritos.value = data.data;
}

function formatFecha(fechaIso) {
  const fecha = new Date(fechaIso);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

onMounted(() => {
    fetchCarritos();
});

function verCarrito(carrito) {
    alert(`Ver carrito: ${carrito.name}`);
}
function editarCarrito(carrito) {
    alert(`Editar carrito: ${carrito.name}`);
    router.push({ name: 'DetallesCarrito', params: { id: carrito.cart_id }, query: { nombre: carrito.name } });

}
function eliminarCarrito(carrito) {
    if (confirm(`¿Eliminar el carrito "${carrito.name}"?`)) {
        carritos.value = carritos.value.filter(c => c.cart_id !== carrito.cart_id);
    }
}
</script>

<style scoped>
.gestion-carritos {
  max-width: 1100px;
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
.no-carritos {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-top: 40px;
}
.carritos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}
.carrito-card {
  background: #f7f7f7;
  border-radius: 18px;
  border:1px solid #10b68d ;
  box-shadow: 0 4px 16px rgba(16,182,141,0.3);
  padding: 32px 28px;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: box-shadow 0.2s;
}
.carrito-card:hover {
  box-shadow: 0 8px 24px rgba(16,182,141,0.18);
}
.carrito-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
}
.carrito-nombre {
  font-size: 1.4rem;
  font-weight: bold;
  color: #10b68d;
}
.carrito-productos {
  color: #555;
  font-size: 1.05rem;
}
.carrito-actions {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 10px;
}
.btn_ver, .btn_edit, .btn_delete {
  border: none;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, background 0.2s   ;
}

.btn_ver:hover, .btn_edit:hover, .btn_delete:hover {
    transform: translateY(-2px) scale(1.04);
}

.btn_ver {
  background: #e0f7f3;
  color: #10b68d;
}
.btn_ver:hover {
  background: #b2f0e7;
}
.btn_edit {
  background: #fffbe0;
  color: #e6b800;
}
.btn_edit:hover {
  background: #fff3b0;
}
.btn_delete {
  background: #fdecea;
  color: #e74c3c;
}
.btn_delete:hover {
  background: #f8d7da;
}

/* Responsive styles */
@media (max-width: 900px) {
  .carritos-grid {
    gap: 20px;
  }
  .carrito-card {
    min-width: 90vw;
    max-width: 98vw;
    padding: 24px 10px;
  }
  .carrito-actions {
    gap: 10px;
  }
}
@media (max-width: 600px) {
  .gestion-carritos {
    padding: 16px 2vw;
  }
  .carrito-card {
    min-width: 98vw;
    max-width: 100vw;
    padding: 18px 2vw;
  }
  .carrito-header {
    margin-bottom: 16px;
  }
  .btn_ver, .btn_edit, .btn_delete {
    padding: 8px 10px;
    font-size: 0.95rem;
    gap: 5px;
  }
  .carrito-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
}
</style>