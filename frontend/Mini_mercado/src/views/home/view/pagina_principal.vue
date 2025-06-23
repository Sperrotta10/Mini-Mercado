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
</template>

<script setup>
import logo from '@/assets/Imagenes/LogoMSJ.png'
</script>

<style scoped>
@import url('./pagina_principal.css');
</style>