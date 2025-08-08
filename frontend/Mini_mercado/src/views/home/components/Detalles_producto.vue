<template>
    <header_general></header_general>
    <div class="contenedor">
        <div class="producto_detalle">
            <div class="product_imagen">
                <img :src="producto?.image || placeholder" alt="Producto_imagen">
            </div>
            <div class="producto_informacion">
                <h1 class="producto_titulo">{{ producto?.name || 'Cargando...' }}</h1>
                <span class="producto_categoria">{{ categoria?.name || 'Cargando...' }}</span>
                <div class="producto_precio">${{ producto?.price || '--' }}</div>
                <div class="producto_disponible">Disponible: {{ producto?.stock ?? '--' }}</div>
                <div class="control_cantidad">
                    <button class="btn_cantidad menos" @click="decrementar">-</button>
                    <input type="text" class="input_cantidad" :value="cantidad_producto">
                    <button class="btn_cantidad mas" @click="incrementar">+</button>
                </div>
                <button class="agregar_al_carrito">Agregar al carrito</button>
            </div>
        </div>

        <h2 class="section_titulo">Productos recomendados</h2>
        <div class="carousel-container">
            <button @click="prev" class="nav-btn">‹</button>
            <div class="carousel-window">
                <div
                    class="carousel-track"
                    :style="trackStyle"
                >
                    <div
                    v-for="producto in productos"
                    :key="producto.product_id"
                    class="carousel-item"
                    >
                    <carta_producto
                        :imagen="producto.image || Ejemplo_png"
                        :nombre="producto.name"
                        :precio="producto.price"
                    />
                    </div>
                </div>
                </div>

            <button @click="next" class="nav-btn">›</button>
        </div>
    </div>
    <footer_general></footer_general>
</template>

<script setup>
import { watch, onMounted,ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Ejemplo_png from '@/assets/Imagenes/productos/pizza jamon.png'
import header_general from '@/modules/header_general.vue';
import footer_general from '@/modules/footer_general.vue';
import Carta_producto from './Carta_producto.vue';
import { ProductService } from '@/utils/productServices';
import { categoryService } from '@/utils/categoryServices';
import placeholder from '@/assets/Imagenes/placeholder.webp';

const route = useRoute();
const productService = new ProductService();
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
const productos = ref([{}])

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

async function CargarProductosRecomendados() {
    try {
        const res = await productService.getProductsPaginated(
        1, 10, 0, 100, 0, categoria.value.categoria_id
        );
        // Filtra el producto actual
        productos.value = (Array.isArray(res.data.products) ? res.data.products : [])
        .filter(p => p.product_id !== producto.value.product_id);
    } catch (err) {
        console.error('Error al cargar productos recomendados:', err);
        productos.value = [];
    }
}

onMounted(async () => {
    await cargarProducto(route.params.nombre)
    await CargarProductosRecomendados()
})

watch(
    () => route.params.nombre,
    (nuevoNombre) =>{
        cargarProducto(nuevoNombre)
    }
)

const startIndex = ref(0)
const itemsToShow = 3

const trackStyle = computed(() => {
  return {
    transform: `translateX(-${startIndex.value * (100 / itemsToShow)}%)`,
    transition: 'transform 0.5s ease'
  }
})

function next() {
  if (startIndex.value < productos.value.length - itemsToShow) {
    startIndex.value++
  } else {
    startIndex.value = 0
  }
}

function prev() {
  if (startIndex.value > 0) {
    startIndex.value--
  } else {
    startIndex.value = productos.value.length - itemsToShow
  }
}

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

.producto_disnpZnible {
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
    gap: 25px;
    max-width: 100%;
    margin: auto;
    
}

.section_titulo {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}


@media (max-width: 768px) {
    .producto_detalle {
        flex-direction: column;
    }
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.carousel-window {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 15px; /* espacio entre tarjetas */
}

.carousel-item {
  flex: 0 0 calc((90% / 3)); /* 3 elementos visibles menos el gap */
}


.nav-btn {
    background: white;
    border: 0.5px solid #00a86b;
    color: #00a86b;
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    height: 120px;
}


</style>