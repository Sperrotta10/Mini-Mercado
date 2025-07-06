<template>
    <div class="producto_carta">
      <RouterLink :to="`/producto_detalles/${nombre}`"> <!--Aqui agregamos la cosa de routerlink para que puede conectarse, permitiendo abrir otra ruta-->
        <img :src="imagen" alt="Producto" class="producto_carta_imagen">
        <div class="producto_informacion">

            <h3 class="producto_nombre">{{ nombre }}</h3>
            <div class="producto_precio">{{precio}}</div>

            <button class="btn_agregar_carrito" @click="showModal = true">Agregar carrito</button>
            <button class="btn_agregar_carrito">Ver más detalles</button>
        </div>
      </RouterLink>

        <!-- Usando la etiqueta de teleport para hacer la modal más sencillo -->
        <Teleport to="body">
            <div v-if="showModal" class="contenedor_principio_modal" @click.self="cerrarModal">
                <div class="contenedor_modal">

                    <!-- Boton de apagar "X" -->
                    <button class="btn_apagar_modal" @click="cerrarModal">
                        <span>X</span>
                    </button>
                    
                    <!-- Contenido pagina modal -->
                    <div class="contenido_modal">
                        <h3 class="titulo_modal">Agregar {{ nombre }}</h3>
                        
                        <!-- Información de producto -->
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
                                <input type="number" id="contador" min="1" :value="cantidad_producto" class="contador_input_numero" />
                                <button class="btn_contador" @click="incrementar">+</button>
                            </div>
                        </div>
                        
                        <button class="btn_agregar_para_carrito">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </Teleport>
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
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    cerrarModal() {
      this.showModal = false;
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

<script setup>
import { ref } from 'vue';
const cantidad_producto = ref(0);

//Para incrementar la cantidad de producto
const incrementar = () => {
  cantidad_producto.value++;
}

//Para decrementar 
const decrementar = () => {
  if (cantidad_producto.value > 0){
    cantidad_producto.value--;
  }
  
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
</style>