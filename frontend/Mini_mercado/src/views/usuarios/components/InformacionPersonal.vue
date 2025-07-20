<template>
    <div class="carta_cliente">
        <div class="avatar-container">
            <img :src="customer.avatar || 'no hay'" :alt="customer.name + 'su perfil'" class="avatar">
        </div>

        <div class="contenedor_informacion">
            <h3 class="cliente_nombre">{{ customer.name }}</h3>

            <div class="item_informacion">
                <span class="icon">Teléfono 📱: </span>
                <span class="text">{{ customer.phone || 'NO HAY TLF' }}</span>
            </div>

            <div class="item_informacion">
                <span class="icon">Correo Electrónico ✉️: </span>
                <span class="text">{{ customer.email || 'NO HAY CORREO' }}</span>
            </div>

            <div class="item_informacion">
                <span class="icon">ID 🆔: </span>
                <span class="text">{{ customer.id }}</span>
            </div>

            <div class="item_informacion">
                <span class="icon">Estado: </span>
                <span class="text">{{ customer.estado }}</span>
            </div>

            <div class="accion_btn">
                <button class="btn_editar" @click="activar_suscriptor">ACTIVAR SUSCRIPTOR ⭐</button>
                <button class="btn_editar" @click="entrar_editar">Editar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon_User from '@/assets/Imagenes/user_example.png'
import { useRouter } from 'vue-router';

const router = useRouter()

const entrar_editar = () => {
  router.push('/usuario/editar_informacion')
}

const activar_suscriptor = () =>{
    alert("SUSCRIPTOR ACTIVO!!!")
}

// Permite que llama esta vista de una en otra template
const props = defineProps({
    customer: {
        type: Object,
        required: true,
        default: () => ({
            id: '01600',
            name: 'Skirk',
            phone: '14156328956',
            email: 'pato_cute@teyvat.com',
            avatar: Icon_User,
            estado: 'Usuario Suscriptor'
        })
    }
});
</script>

<style scoped>
.carta_cliente {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
    margin: 0 auto;
}

.carta_cliente:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.avatar-container {
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    border-radius: 10%;
    overflow: hidden;
    border: 3px solid #f0f0f0;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.contenedor_informacion {
    flex-grow: 1;
}

.cliente_nombre {
    margin: 0 0 12px 0;
    font-size: 1.4rem;
    color: #333;
    font-weight: 600;
}

.item_informacion {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.95rem;
    padding-top: 15px;
}

.icon {
    margin-right: 10px;
    font-size: 1.1rem;
    opacity: 0.7;
}

.text {
    color: #555;
    word-break: break-all;
}

.accion_btn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    font-size: 0.95rem;
    gap: 20px;
}

.btn_editar {
    width: 240px;
    padding: 0.75rem;
    border: none;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 0.95rem;
    color: white;
    font-weight: 700;
    transition: all 0.3s ease;
    background-color: #10b68d;
}

.btn_editar:hover {
    background-color: #018175;
}

/* responsive */
@media (max-width: 950px) {
    .carta_cliente {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .item_informacion {
        justify-content: center;
    }

    .avatar-container {
        width: 150px;
        height: 150px;
    }

    .accion_btn {
        justify-content: center;
    }

    .btn_editar{
        width: 50%;
    }
}
</style>