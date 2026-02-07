<template>
    <div class="contenedor_logo">
        <router-link to ="/">
            <img :src="logo" alt="LOGOMSJ" class="logo">
        </router-link>
    </div>
</template>

<script setup>
import logo from '@/assets/Imagenes/LogoMSJ.png'
</script>

<style scoped>
.contenedor_logo {
    display: flex;
    align-items: center;
}

.logo {
    align-items: center;
    width: auto;
    height: 70px;
}

.logo:hover {
    cursor: pointer;
}
</style>