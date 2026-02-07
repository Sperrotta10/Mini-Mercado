<template>
    <header>
        <div class="barra_principal">
            <logo_con_link></logo_con_link>

            <div class="contenedor_buscador">
                <input type="text" placeholder="Buscar producto">
                <button>Buscar</button>
            </div>
            
            <div class="contendor_accion_usuarios">
                <button
                    v-if="auth.user?.role != 'admin'"
                    class="btn_carrito"
                    @click="showCart = true"
                >
                    <i class="fas fa-shopping-cart"></i> Carrito
                </button>
                <template v-if="!auth.isAuthenticated">
                    <router-link to="/login" class="btn_link">
                        <button class="btn_login"><i class="fas fa-user"></i> Login</button>
                    </router-link>
                </template>
                <template v-else>
                    <router-link
                        v-if="auth.user?.role === 'admin'"
                        to="/administrador"
                        class="btn_link"
                    >
                        <button class="btn_login"><i class="fas fa-user-shield"></i> Administrador</button>
                    </router-link>

                    <router-link
                        v-else-if="auth.user?.role === 'cliente'"
                        to="/usuario"
                        class="btn_link"
                    >
                        <button class="btn_login"><i class="fas fa-user"></i> Usuario</button>
                    </router-link>
                </template>
                <template v-if="auth.isAuthenticated">
                        <button class="btn_logout" @click="auth.logout"><i class="fas fa-sign-out-alt"></i></button>
                </template>
            </div>
        </div>
        <CartSidebar :show="showCart" @close="showCart = false" />
    </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/Auth';
import logo_con_link from './logo_con_link.vue';
import { ref } from 'vue';
import CartSidebar from './CartSidebar.vue';

const auth = useAuthStore();
const showCart = ref(false);

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

.btn_logout {
    background: none;
    color: #10b68d;
    border: none;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 10px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.btn_logout:hover {
    background: rgba(255, 0, 0, 0.1);
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

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100vh;
    background: #fff;
    box-shadow: -2px 0 10px rgba(0,0,0,0.15);
    z-index: 2000;
    padding: 24px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    animation: slideInCart 0.3s;
}
@keyframes slideInCart {
    from { right: -400px; }
    to { right: 0; }
}
.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;
}
.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #10b68d;
}
.cart-content {
    flex: 1;
    overflow-y: auto;
}
.cart-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 1500;
}
</style>