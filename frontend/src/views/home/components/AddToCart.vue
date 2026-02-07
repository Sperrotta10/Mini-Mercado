<template>
  <div>
    <button
      class="btn_agregar_carrito"
      @click="handleAgregarCarrito"
    >
      Agregar carrito
    </button>
    <Teleport to="body">
      <div v-if="showModal" class="contenedor_principio_modal" @click.self="cerrarModal">
        <div class="contenedor_modal">
          <button class="btn_apagar_modal" @click="cerrarModal">
            <span>X</span>
          </button>
          <div class="contenido_modal">
            <h3 class="titulo_modal">Agregar {{ nombre }}</h3>
            <div class="producto_modal">
              <img :src="imagen" :alt="nombre" class="producto_modal_imagen">
              <div>
                <h4>{{ nombre }}</h4>
                <div class="precio_producto_modal">{{ precio }}</div>
              </div>
            </div>
            <div class="contador_para_producto">
              <label for="contador">Cantidad:</label>
              <div class="control_contador">
                <button class="btn_contador" @click="decrementar">-</button>
                <input type="number" id="contador" min="1" :value="cantidad_producto" class="contador_input_numero" readonly />
                <button class="btn_contador" @click="incrementar">+</button>
              </div>
            </div>
            <button class="btn_agregar_para_carrito" @click="abrirModalCarritos">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal para mostrar carritos -->
    <Teleport to="body">
      <div v-if="showCarritosModal" class="contenedor_principio_modal" @click.self="cerrarModalCarritos">
        <div class="contenedor_modal">
          <button class="btn_apagar_modal" @click="cerrarModalCarritos">
            <span>X</span>
          </button>
          <div class="contenido_modal">
            <h3 class="titulo_modal">Selecciona un carrito</h3>
            <div v-if="carritos.length === 0" class="no-carritos">
              <p>No tienes carritos guardados.</p>
            </div>
            <div v-else class="carritos-grid-modal">
              <div v-for="carrito in carritos" :key="carrito.cart_id" class="carrito-card-modal">
                <div class="carrito-header-modal">
                  <span class="carrito-nombre-modal">{{ carrito.name }}</span>
                  <span class="carrito-productos-modal">
                    Última actualización: {{ formatFecha(carrito.updatedAt) }}
                  </span>
                </div>
                <button class="btn_seleccionar_carrito" @click="seleccionarCarrito(carrito)">
                  Seleccionar
                </button>
              </div>
            </div>
            
          </div>
          <div v-if="carritos.length < 3" class="btn_agregar_para_carrito">
              <AddCartBtn @carrito-agregado="cargarCarritos"  />
            </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CartService } from '@/utils/cartService';
import { CartItemService } from '@/utils/cartItemService';
import Swal from 'sweetalert2';
import AddCartBtn from '@/modules/AddCartBtn.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/Auth';

const auth = useAuthStore();
const router = useRouter();
const props = defineProps({
  id: { type: Number, required: true },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: [Number, String], required: true }
});

const showModal = ref(false);
const showCarritosModal = ref(false);
const carritos = ref([]);
const cantidad_producto = ref(1);
const CartItemServiceInstance = new CartItemService();
const CartServiceInstance = new CartService();

function cerrarModal() {
  showModal.value = false;
}
function abrirModalCarritos() {
  showCarritosModal.value = true;
  cargarCarritos();
}
function cerrarModalCarritos() {
  showCarritosModal.value = false;
}
async function cargarCarritos() {
  try {
    const response = await CartServiceInstance.getAllCarts();
    carritos.value = response.data;
  } catch (e) {
    carritos.value = [];
    console.log(e);
  }
}
function seleccionarCarrito(carrito) {
  const nuevoItem = {
    product_id: props.id,
    quantity: cantidad_producto.value,
    cart_id: carrito.cart_id
  };
  CartItemServiceInstance.createCartItem(nuevoItem)
    .then(() => {
      cerrarModalCarritos();
      cerrarModal();
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se agregó correctamente al carrito.',
        confirmButtonColor: '#10b68d'
      });
    })
    .catch((error) => {
      console.error('Error al agregar el item al carrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el producto al carrito.',
        confirmButtonColor: '#d33'
      });
    });
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
function incrementar() {
  cantidad_producto.value++;
}
function decrementar() {
  if (cantidad_producto.value > 1) {
    cantidad_producto.value--;
  }
}

function handleAgregarCarrito() {
  if (!auth.isAuthenticated || auth.user?.role !== 'cliente') {
    Swal.fire({
      icon: 'info',
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión como cliente para usar carritos.',
      confirmButtonText: 'Ir al login',
      confirmButtonColor: '#10b68d'
    }).then(result => {
      if (result.isConfirmed) {
        router.push({ name: 'Pagina de Login usuario' });
      }
    });
    return;
  }
  showModal.value = true;
}
</script>

<style scoped>
.producto_carta {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.link{
  text-decoration: none;
}

.link h3{
  color: #004C45;
}

.producto_carta:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.producto_carta_imagen {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
}

.producto_informacion {
    padding: 15px;
}

.producto_nombre {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    height: 40px;
    overflow: hidden;
}

.producto_precio {
    color: #004C45;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 10px 0;
}


.btn_agregar_carrito {
    width: 100%;
    background: #10b68d;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    margin-top: 5px;
    transition: all 0.3s ease;
}

.btn_agregar_carrito:hover {
    background: #018175;
}



/*Pagina modal ------------------------------------------------------------------*/
.contenedor_principio_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.contenedor_modal {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  overflow: hidden;
}

.btn_apagar_modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  width: 32px;
  height: 32px;
  color: #10b68d;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.btn_apagar_modal:hover {
  background-color: #10b68d;
  color: #004C45;
}

.btn_apagar_modal span{
  font-size: 1.2rem;
}

.contenido_modal {
  padding: 30px;
}

.titulo_modal {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.4rem;
  text-align: center;
  color: #333;
}

.producto_modal {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.producto_modal_imagen {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.producto_modal h4 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.precio_producto_modal {
  font-weight: bold;
  font-size: 1.2rem;
  color: #004C45;
}

/*selector para el input number */
.contador_para_producto {
  margin-bottom: 25px;
}

.contador_para_producto label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.control_contador {
  display: flex;
  align-items: center;
}

.btn_contador {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn_contador:hover {
  background-color: #eaeaea;
}

.contador_input_numero {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  font-size: 1rem;
  outline: none;
}

/*quita el flechito de input number */
.contador_input_numero::-webkit-outer-spin-button,
.contador_input_numero::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn_agregar_para_carrito {
  width: 100%;
  padding: 14px;
  background-color: #10b68d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn_agregar_para_carrito:hover {
  background-color: #018175;
}

/* Estilos para la selección de carrito en modal */
.carritos-grid-modal {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}
.carrito-card-modal {
  background: #f7f7f7;
  border-radius: 12px;
  border: 1px solid #10b68d;
  box-shadow: 0 2px 8px rgba(16,182,141,0.10);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.carrito-header-modal {
  margin-bottom: 10px;
}
.carrito-nombre-modal {
  font-size: 1.1rem;
  font-weight: bold;
  color: #10b68d;
}
.carrito-productos-modal {
  color: #555;
  font-size: 0.95rem;
}
.btn_seleccionar_carrito {
  background: #10b68d;
  color: white;
  border: none;
  border-radius: 18px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
  transition: background 0.2s;
}
.btn_seleccionar_carrito:hover {
  background: #018175;
}
.no-carritos {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-top: 20px;
}
</style>