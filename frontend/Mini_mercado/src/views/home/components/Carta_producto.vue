<template>
    <div class="producto_carta">
        <img :src="imagen" alt="Producto" class="producto_carta_imagen">
        <div class="product_informacion">

            <h3 class="producto_nombre">{{ nombre }}</h3>
            <div class="producto_precio">{{precio}}</div>

            <button class="btn_agregar_carrito">Agregar carrito</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Producto_carta_funcion',
  props: {
    imagen: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    precio: {
      type: [Number, String],
      required: true
    }
  },
//   methods: { //Esto quizas es para el futuro
//     Agregar_al_carrito() {
//       this.$emit('Agregar_al_carrito', {
//         nombre: this.nombre,
//         precio: this.precio,
//         imagen: this.imagen
//       });
//     }
//   }
}
</script>

<style scoped>
.producto_carta {
    width: 160px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
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