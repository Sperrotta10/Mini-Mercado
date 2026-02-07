<template>
    <div class="carta_consultaduda">
        <div class="contenedor_imagen">
            <img :src="minimarket.imagen || 'no hay'" :alt="minimarket.name + 'su perfil'" class="imagen">
        </div>

        <div class="contenedor_informacion">
            <h3 class="cliente_nombre">¿Tiene duda? ¡Estamos a la orden!</h3>

            <div class="item_informacion">
                <span class="icon">Teléfono 📱: </span>
                <span class="text">{{ minimarket.phone || 'NO HAY TLF' }}</span>
            </div>

            <div class="item_informacion">
                <span class="icon">Correo Electrónico ✉️: </span>
                <span class="text">{{ minimarket.email || 'NO HAY CORREO' }}</span>
            </div>

            <div class="item_informacion">
                <span class="icon">Dirección 📍: </span>
                <span class="text">{{ minimarket.direccion }}</span>
            </div>

        </div>
    </div>
</template>

<script setup>
import imagen_logo from '@/assets/Imagenes/LogoMSJ.png'

const minimarket =
{
    id: '01600',
    name: 'Skirk',
    phone: '0212-8888888',
    email: 'msjmarket.soporte@gmail.com',
    imagen: imagen_logo,
    direccion:'Dirección: San Diego, Calle Mavuika N°1'
}
    ;
</script>
<style scoped>
.carta_consultaduda {
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

.contenedor_imagen {
    flex-shrink: 0;
    width: 45%;
    height: 45%;
    border-radius: 2%;
    overflow: hidden;
    border: 1px solid #f0f0f0;
}

.imagen {
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

/* responsive */
@media (max-width: 1200px) {
    .carta_consultaduda {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }

    .item_informacion {
        justify-content: center;
    }

    .contenedor_imagen {
        width: 70%;
        height: 70%;
    }
}
</style>