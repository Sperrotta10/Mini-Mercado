<template>
    <div class="categoria_carta">
        <div class="product_imagen">
            <img :src="Imagen" alt="Imagen">
        </div>

        <div class="tapa_overlay">
            <RouterLink target="_blank" to="/ejemplo">
                <span class="hover_texto">Frutas</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import Imagen from '@/assets/Imagenes/categorias/fruta.jpg'
</script>

<style scoped>
.categoria_carta {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden; 
    position: relative;
}

.categoria_carta:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product_imagen {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.product_imagen img{
    width: 100%;
    height: 100%;
    object-fit: cover; 
    object-position: center; 
    transition: transform 0.3s ease; 
}

.tapa_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(16, 182, 141, 0.5); 
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0; 
    transition: opacity 0.3s ease; 
}

.tapa_overlay a{
    text-decoration: none;
}

.tapa_overlay a:hover{
    text-decoration: underline;
    color: #fee3b2;
}

.hover_texto {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    padding: 20px 40px;
    transform: translateY(20px); 
    opacity: 0; 
    transition: all 0.3s ease 0.1s;
}

.categoria_carta:hover .tapa_overlay {
    opacity: 1; 
}

.categoria_carta:hover .hover_texto {
    opacity: 1;
    transform: translateY(0); 
}

.categoria_carta:hover img {
    transform: scale(1.05);
}
</style>