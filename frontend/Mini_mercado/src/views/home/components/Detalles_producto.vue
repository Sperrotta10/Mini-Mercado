<template>
<div class="contenedor">
        <div class="producto_detalle">
            <div class="product_imagen">
                <img :src="Ejemplo_png" alt="Producto_imagen">
            </div>
            <div class="producto_informacion">
                <h1 class="producto_titulo">Manzana</h1>
                <span class="producto_categoria">Frutas</span>
                <div class="producto_precio">$29.90</div>
                <div class="producto_disnonible">Disponible: </div>
                
                <div class="control_cantidad">
                    <button class="btn_cantidad menos">-</button>
                    <input type="text" class="input_cantidad" value="1">
                    <button class="btn_cantidad mas">+</button>
                </div>
                
                <button class="agregar_al_carrito">Agregar_al_carrito</button>
            </div>
        </div>
        
        <div class="producto_aleatorio_recomendado">
            <h2 class="section_titulo">Producto recomendado</h2>
            <div class="producto_grid">
                <div class="producto_carta">
                    <img :src="Ejemplo_png" alt="Producto1" class="producto_carta_imagen">
                    <div class="producto_carta_cuerpo">
                        <h3 class="producto_carta_titulo">Manzana</h3>
                        <div class="producto_carta_precio">$25.80</div>
                    </div>
                </div>
                
                <div class="producto_carta">
                    <img :src="Ejemplo_png" class="producto_carta_imagen">
                    <div class="producto_carta_cuerpo">
                        <h3 class="producto_carta_titulo">Manzana</h3>
                        <div class="producto_carta_precio">$39.90</div>
                    </div>
                </div>
                
                <div class="producto_carta">
                    <img :src="Ejemplo_png" alt="Producto1" class="producto_carta_imagen">
                    <div class="producto_carta_cuerpo">
                        <h3 class="producto_carta_titulo">Manzana</h3>
                        <div class="producto_carta_precio">$89.00</div>
                    </div>
                </div>
                
                <div class="producto_carta">
                    <img :src="Ejemplo_png" alt="Producto1" class="producto_carta_imagen">
                    <div class="producto_carta_cuerpo">
                        <h3 class="producto_carta_titulo">Manzana</h3>
                        <div class="producto_carta_precio">$129.00</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Ejemplo_png from '@/assets/Imagenes/pizza jamon.png'
</script>

<style scoped>
.contenedor{
    max-width: 1200px;
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
    margin: 0 5px;
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
}

.section_titulo {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.producto_grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.producto_carta {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.producto_carta:hover {
    transform: translateY(-5px);
}

.producto_carta_imagen {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.producto_carta_cuerpo {
    padding: 15px;
}

.producto_carta_titulo {
    font-size: 16px;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.producto_carta_precio {
    color: #10b68d;
    font-weight: bold;
    font-size: 18px;
}

@media (max-width: 768px) {
    .producto_detalle {
        flex-direction: column;
    }
    
    .producto_grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>