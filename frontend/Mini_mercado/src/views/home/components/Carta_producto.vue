<template>
  <div class="producto_carta">
    <img :src="props.imagen || placeholder" alt="Producto" class="producto_carta_imagen">
    <div class="producto_informacion">
      <h3 class="producto_nombre">{{ props.nombre }}</h3>
      <div class="producto_precio"> Precio: ${{ props.precio }}</div>
      <RouterLink :to="`/producto_detalles/${props.nombre}`" class="link">
        <button class="btn_agregar_carrito">Ver más detalles</button>
      </RouterLink>
      <AddToCart
        :id="props.id"
        :imagen="props.imagen"
        :nombre="props.nombre"
        :precio="props.precio"
        :stock="props.stock"
      />
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
  precio: { type: [Number, String], required: true }
});
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
</style>