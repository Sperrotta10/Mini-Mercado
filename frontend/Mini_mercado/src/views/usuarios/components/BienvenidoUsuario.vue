<template>    
    <div class="contenedor">
        <div class="carta_bienvenida">
            <h1>¡Bienvenido de nuevo! {Nombre de Usuario} 🎉</h1>
            <div class="contenedor_imagenes">
                <img :src="Icon_User" alt="Perfil_usuario" class="perfil">
                <img :src="imagen_logo" alt="imagen_logo" style="width: 50%; height: auto;">
            </div>
        </div>
        
        <div class="motivacional_mensaje">
            <p>“¡Nos encanta verte por aquí! Esperamos que disfrutes tu experiencia de compra. 😆”</p>
        </div>
    </div>
</template>

<script setup>
import imagen_logo from '@/assets/Imagenes/LogoMSJ.png'
import Icon_User from '@/assets/Imagenes/user_example.png'

</script>

<style scoped>
.contenedor {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Tarjeta de bienvenida */
.carta_bienvenida {
    background: white;
    border-radius: 10px;
    padding: 30px;
    margin: 20px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.carta_bienvenida h1 {
    font-size: 2.2rem;
    margin: 0;
    color: #2c3e50;
}

.carta_bienvenida p.sub_titulo {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin: 10px 0 20px;
}

.contenedor_imagenes{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
}

.contenedor_imagenes .perfil{
    width: 15%;
    height: auto;
    /* border-radius: 50%; */
}

/* Mensaje motivacional */
.motivacional_mensaje {
    text-align: center;
    font-style: italic;
    color: #7f8c8d;
    margin-top: 30px;
    padding: 15px;
    border-top: 1px solid #eee;
}
</style>