<template>
  <div class="producto_carta">
    <img :src="props.imagen || placeholder" alt="Producto" class="producto_carta_imagen">
    <div class="producto_informacion">
      <h3 class="producto_nombre">{{ props.nombre }}</h3>
      <div class="producto_precio"> Precio: ${{ props.precio }}</div>
      <div class="producto_oferta_slot">
        <div class="producto_oferta" v-if="(props.isPremium || props.isPremium == 'true') && props.oferta > 0">
          ¡Oferta! Precio: ${{ (props.precio * (1 - props.oferta / 100)).toFixed(2) }}
        </div>
      </div>
      <div class="producto_acciones">
        <RouterLink :to="`/producto_detalles/${props.nombre}`" class="link">
          <button class="btn_detalles">Ver más detalles</button>
        </RouterLink>
        <AddToCart
          :id="props.id"
          :imagen="props.imagen"
          :nombre="props.nombre"
          :precio="props.isPremium && props.oferta > 0
                          ? (props.precio * (1 - props.oferta / 100)).toFixed(2)
                          : props.precio || '--'"
          :stock="props.stock"
          :oferta="props.oferta"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const placeholder = '../../../assets/Imagenes/placeholder.webp';
import AddToCart from './AddToCart.vue'


const props = defineProps({
  id: { type: Number, required: true },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  stock: { type: Number, required: true },
  precio: { type: [Number, String], required: true },
  oferta: { type: Number, required: false, default: 0 },
  isPremium: { type: Boolean, required: true, default: false }
});


</script>

<style scoped>
.producto_carta {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  height: 460px;
  display: flex;
  flex-direction: column;
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
  height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
}

.producto_informacion {
    padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
}

.producto_nombre {
    font-size: 1rem;
    font-weight: 600;
  margin: 0;
  line-height: 1.2;
  min-height: 2.4em; /* reserva 2 líneas para mantener simetría */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.producto_precio {
    color: #004C45;
    font-weight: 700;
    font-size: 1.2rem;
  margin: 6px 0;
}

.producto_oferta_slot {
  min-height: 1.2em; /* reserva 1 línea para mantener simetría */
}

.producto_oferta {
    color: #E74C3C;
    font-weight: 700;
    font-size: 1rem;
  margin: 0;
}

.btn_detalles {
    width: 100%;
  background: transparent;
  color: #018175;
  border: 2px solid #10b68d;
  padding: 10px;
  border-radius: 8px;
    cursor: pointer;
  font-weight: 600;
    margin-top: 0;
    transition: all 0.3s ease;
}

.btn_detalles:hover {
  background: rgba(16, 182, 141, 0.12);
}

.producto_acciones {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  gap: 10px;
}

@media (max-width: 576px) {
  .producto_carta {
    height: 400px;
  }

  .producto_carta_imagen {
    height: 160px;
  }

  .producto_precio {
    font-size: 1.05rem;
  }
}
</style>