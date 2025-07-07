<template>
    <header>
        <div class="barra_principal">
            <logo_con_link></logo_con_link>

            <div class="contenedor_buscador">
                <input type="text" placeholder="Buscar producto">
                <button>Buscar</button>
            </div>

            <div class="contendor_accion_usuarios">
                <router-link to ="/login" class="btn_link"><button class="btn_login"><i class="fas fa-user"></i> Login</button></router-link>
                <button class="btn_carrito"><i class="fas fa-shopping-cart"></i> Carrito</button>
            </div>
        </div>
    </header>
</template>

<script setup>
import logo_con_link from './logo_con_link.vue';
</script>

<style scoped>
/*Parte Header ------------------------------------------------------------------*/
header{
    background: white;
    color: white;
    padding: 15px 5%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.barra_principal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.contenedor_buscador {
    flex: 1;
    max-width: 600px;
    margin: 0 20px;
    position: relative;
}

.contenedor_buscador input {
    width: 100%;
    padding: 12px 120px 12px 24px;
    border-radius: 30px;
    border: none;
    font-size: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.contenedor_buscador button {
    position: absolute;
    right: 5px;
    top: 5px;
    background: #10b68d;
    border: none;
    color: white;
    padding: 7px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
}

.contendor_accion_usuarios {
    display: flex;
    align-items: center;
    padding: 10px;
}

.btn_login,
.btn_carrito {
    background: #10b68d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.btn_login:hover,
.btn_carrito:hover {
    background: #018175;
    transform: translateY(-2px);
}

.btn_login i,
.btn_carrito i {
    margin-right: 8px;
}

.btn_link{
    text-decoration: none;
    color: white;
}

@media (max-width: 768px) {
    .barra_principal {
        flex-direction: column;
    }
}
</style>