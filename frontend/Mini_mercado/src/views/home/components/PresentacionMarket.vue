<template>
    <div class="contenedor">
        <div class="contenedor_titulo">
            "Comprar más organizado — ¡<strong>Mini-Supermarket-Junction</strong>, tu mejor compañero de compras!" 
        </div>
        
        <div class="contenedor_cartel">
            <div class="cartel_carta">
                <div class="carta_icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <h3 class="carta_titulo">Gran Variedad</h3>
                <p class="carta_descripcion">200+ productos, todo en un solo lugar. Stock actualizado para cubrir tus necesidades diarias.</p>
            </div>
            
            <div class="cartel_carta">
                <div class="carta_icon">
                    <i class="fa-solid fa-thumbs-up"></i>
                </div>
                <h3 class="carta_titulo">Servicio Excelente</h3>
                <p class="carta_descripcion">Servicio amable, respuestas profesionales.</p>
            </div>
            
            <div class="cartel_carta">
                <div class="carta_icon">
                    <i class="fa-solid fa-wallet"></i>
                </div>
                <h3 class="carta_titulo">Las Mejores Ofertas</h3>
                <p class="carta_descripcion">Ofertas diarias + descuentos para miembros. ¡Ahorra tiempo y dinero!</p>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    max-width: 1400px;
    margin: 40px auto;
    padding: 0 20px;
}

.contenedor_titulo {
    font-size: 1.5rem;
    color: #018175;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e0e0e0;
    text-align: center;
}

.contenedor_cartel {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 40px 0;
}

.cartel_carta {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    text-align: center;
    padding: 25px 15px;
    transition: all 0.3s ease;
}

.cartel_carta:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.carta_icon {
    font-size: 2.5rem;
    color: #018175;
    margin-bottom: 15px;
}

.carta_titulo {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
}

.carta_descripcion {
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .contenedor_cartel{
        grid-template-columns: repeat(1,1fr);
    }
}
</style>