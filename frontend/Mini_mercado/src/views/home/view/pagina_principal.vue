<template>
    <header>
        <div class="barra_principal">
                <div class="contenedor_logo">
                    <img :src="logo" alt="LOGOMSJ" class="logo">
                </div>

                <div class="contenedor_buscador">
                    <input type="text" placeholder="Buscar producto">
                    <button>Buscar</button>
                </div>

                <div class="contendor_accion_usuarios">
                    <button class="btn_login"><i class="fas fa-user"></i> Login</button>
                    <button class="btn_carrito"><i class="fas fa-shopping-cart"></i> Carrito</button>
                </div>
        </div>
    
    </header>

    <main>
        <div class="contendor_producto">
            <div class="producto_carta">
                <img :src="pizza" alt="Producto" class="producto_carta_imagen">
                <div class="product_informacion">
                    <h3 class="producto_nombre">Pizza</h3>
                    
                    <div class="producto_precio">¥19.90</div>
                    <button class="btn_agregar_carrito">Agregar carrito</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import logo from '@/assets/Imagenes/LogoMSJ.png'
import pizza from '@/assets/Imagenes/pizza jamon.png'
</script>

<style scoped>
@import url('./pagina_principal.css');
</style>