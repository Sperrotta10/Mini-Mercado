<template>
    <header_general></header_general>
    <div class="contenedor">
        <div class="producto_detalle">
            <div class="product_imagen">
                <img :src="producto?.image || Ejemplo_png" alt="Producto_imagen">
            </div>
            <div class="producto_informacion">
                <h1 class="producto_titulo">{{ producto?.name || 'Cargando...' }}</h1>
                <span class="producto_categoria">{{ categoria?.name || 'Cargando...' }}</span>
                <div class="producto_precio">${{ producto?.price || '--' }}</div>
                <div class="producto_disnonible">Disponible: {{ producto?.stock ?? '--' }}</div>
                <div class="control_cantidad">
                    <button class="btn_cantidad menos" @click="decrementar">-</button>
                    <input type="text" class="input_cantidad" :value="cantidad_producto">
                    <button class="btn_cantidad mas" @click="incrementar">+</button>
                </div>
                <button class="agregar_al_carrito">Agregar al carrito</button>
            </div>
        </div>
        
        <h2 class="section_titulo">Producto recomendado</h2>
        <div class="producto_aleatorio_recomendado">
            <carta_producto
                v-for="producto in productos" 
                :key="producto.id"
                :imagen="producto.imagen"
                :nombre="producto.nombre"
                :precio="producto.precio"
            ></carta_producto>
        </div>
    </div>
    <footer_general></footer_general>
</template>

<script setup>
import { watch, onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import Ejemplo_png from '@/assets/Imagenes/productos/pizza jamon.png'
import header_general from '@/modules/header_general.vue';
import footer_general from '@/modules/footer_general.vue';
import Carta_producto from './Carta_producto.vue';
import { productService } from '@/utils/productServices';
import { categoryService } from '@/utils/categoryServices';

const route = useRoute();

const cantidad_producto = ref(1);

//Para incrementar la cantidad de producto
const incrementar = () => {
    if(cantidad_producto.value>=producto.value.stock){
        return
    }else{
        cantidad_producto.value++;
    }
}



//Para decrementar 
const decrementar = () => {
  if (cantidad_producto.value > 1){
    cantidad_producto.value--;
  }
  
}


const producto = ref(null)
const categoria = ref(null)
const loading = ref(false)
const error = ref(null)

async function cargarProducto(name) {
    loading.value = true
    error.value = null
    try {
        const res = await productService.getProductsByName(name)
        const prod = res.data[0]
        if (!prod) throw new Error('Producto no encontrado')
        const cat = await categoryService.getCategoryById(prod.categoria_id)
        producto.value = prod
        categoria.value = cat.data
    } catch (err) {
        error.value = err.message || 'Error al buscar producto'
        producto.value = null
        categoria.value = null
        console.log("Error al buscar producto", err)
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await cargarProducto(route.params.nombre)
})

watch(
    () => route.params.nombre,
    (nuevoNombre) =>{
        cargarProducto(nuevoNombre)
    }
)

//Simulando datos conectados:
const productos = [
  {
    id: 1,
    nombre: 'Pizza',
    precio: '19.90',
    imagen: Ejemplo_png
  },
  {
    id: 2,
    nombre: 'Pizza2',
    precio: '15.90',
    imagen: Ejemplo_png
  },
  {
    id: 3,
    nombre: 'Pizza3',
    precio: '15.90',
    imagen: Ejemplo_png
  },
  {
    id: 4,
    nombre: 'Pizza4',
    precio: '15.90',
    imagen: Ejemplo_png
  },
  {
    id: 5,
    nombre: 'Pizza5',
    precio: '15.90',
    imagen: Ejemplo_png
  },
  {
    id: 6,
    nombre: 'Pizza5',
    precio: '20.22',
    imagen: Ejemplo_png
  }
]
</script>

<style scoped>
.contenedor{
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.producto_detalle {
    display: flex;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-bottom: 40px;
}

.product_imagen {
    flex: 1;
    padding: 20px;
    text-align: center;
}

.product_imagen img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
}

.producto_informacion {
    flex: 1;
    padding: 20px;
}

.producto_titulo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
}

.producto_categoria {
    display: inline-block;
    background: #10b68d;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 20px;
}

.producto_precio {
    font-size: 28px;
    color: #10b68d;
    margin: 20px 0;
    font-weight: bold;
}

.producto_disnonible {
    color: #10b68d;
    margin-bottom: 20px;
    font-size: 14px;
}

.control_cantidad {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.btn_cantidad {
    width: 30px;
    height: 30px;
    background: #f0f0f0;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input_cantidad {
    width: 50px;
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
}

.agregar_al_carrito {
    background: #10b68d;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.agregar_al_carrito:hover {
    background: #018175;
}

.producto_aleatorio_recomendado {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 25px;
}

.section_titulo {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

@media (max-width: 1200px) {
    .producto_aleatorio_recomendado {
        grid-template-columns: repeat(4, 1fr);
    }

}

@media (max-width: 768px) {
    .producto_detalle {
        flex-direction: column;
    }

    .producto_aleatorio_recomendado {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 576px) {
    .producto_aleatorio_recomendado {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>