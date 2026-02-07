<template>
    <div class="carta_cliente">
        <div class="avatar-container">
            <img :src="Icon_User" alt="Perfil_usuario" class="avatar">
        </div>

        <div class="contenedor_informacion">
            <template v-if="loading">
                <h3 class="cliente_nombre">Cargando datos...</h3>
            </template>
            <template v-else>
                <h3 class="cliente_nombre">{{ userData.nombre_completo || userData.username || 'Usuario' }}</h3>
                <div class="item_informacion">
                    <span class="icon">Teléfono 📱: </span>
                    <span class="text">{{ userData.telefono || 'NO HAY TLF' }}</span>
                </div>
                <div class="item_informacion">
                    <span class="icon">Correo Electrónico ✉️: </span>
                    <span class="text">{{ userData.email || 'NO HAY CORREO' }}</span>
                </div>
                <div class="item_informacion">
                    <span class="icon">ID: </span>
                    <span class="text">{{ userData.user_id || 'Cargando...' }}</span>
                </div>
                <div class="item_informacion">
                    <span class="icon">Estado: </span>
                    <span class="text">{{ userData.suscripcion ? 'Cliente Premium' : 'Cliente' }}</span>
                </div>
                <div class="accion_btn">
                    <button class="btn_editar" @click="entrar_editar">Editar</button>
                </div>
            </template>
        </div>
        
    </div>
    <div v-if="!userData.suscripcion" class="suscripcion-banner">
        <span class="icon">🎁</span>
        <span class="text">
            <strong>¡Activa tu suscripción!.</strong> Obtén descuentos exclusivos. ¡No te lo pierdas! 🎉
        </span>
        <button class="btn-suscripcion" @click="activarSuscripcion">Activar Suscripción</button>
    </div>
</template>

<script setup>
import Icon_User from '@/assets/Imagenes/user_example.png'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/Auth';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2'
import { UserService } from '@/utils/userServices';
const authStore = useAuthStore();
const router = useRouter()
const UserServiceInstance = new UserService();
const userData = ref({});
const loading = ref(true);

function mapUserData(raw) {
    return {
        user_id: raw.user_id ?? '',
        username: raw.username ?? 'Usuario',
        image_perfil: raw.image_perfil ?? Icon_User,
        nombre_completo: raw.nombre_completo ?? raw.username ?? 'Usuario',
        email: raw.email ?? 'NO HAY CORREO',
        telefono: raw.telefono ?? 'NO HAY TLF',
        cedula: raw.cedula ?? 'No disponible',
        suscripcion: raw.suscripcion,
        rol_id: raw.rol_id ?? 'N/A',
    }
}

async function fetchUserData() {
    loading.value = true;
    authStore.GetThisUserData();
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula tiempo de carga
    const raw = authStore.userData;
    userData.value = mapUserData(raw);
    loading.value = false;
}

onMounted(() => {
    fetchUserData();
});

const entrar_editar = () => {
    router.push('/usuario/editar_informacion')
}


const codigosValidos = ['SUSCRIPCION2025', 'PREMIUM2025', 'VIP2025', 'OFERTA2025'];

const activarSuscripcion = async () => {
    const { value: codigo } = await Swal.fire({
        title: 'Activar Suscripción',
        input: 'text',
        inputLabel: 'Introduce tu código de suscripción',
        inputPlaceholder: 'Código de activación',
        showCancelButton: true,
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un código!';
            }
        }
    });

    if (codigo) {
        // Verifica si el código está en el array de códigos válidos
        if (codigosValidos.includes(codigo.trim().toUpperCase())) {
            UserServiceInstance.updateUser(userData.value.user_id, {suscripcion:'1'});
            await Swal.fire({
                icon: 'success',
                title: '¡Suscripción activada!',
                text: 'Ahora tienes acceso a todos los beneficios.'
            });
            userData.value.suscripcion = true;
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Código inválido',
                text: 'El código ingresado no es válido. Intenta nuevamente.'
            });
        }
    }
};

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

.suscripcion-banner {
    margin: 30px auto 0 auto;
    padding: 24px 20px;
    background: linear-gradient(90deg, #10b68d 0%, #3ec6e0 100%);
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(16, 182, 141, 0.13);
    display: flex;
    align-items: center;
    gap: 18px;
    color: #fff;
    font-size: 1.08rem;
    font-weight: 500;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    animation: suscripcionFadeIn 0.7s;
}

@keyframes suscripcionFadeIn {
    from { opacity: 0; transform: translateY(20px);}
    to { opacity: 1; transform: translateY(0);}
}

.suscripcion-banner .icon {
    font-size: 2.1rem;
    margin-right: 8px;
}

.suscripcion-banner .text {
    flex: 1;
    min-width: 200px;
}

.btn-suscripcion {
    background: #fff;
    color: #10b68d;
    border: none;
    border-radius: 22px;
    padding: 10px 28px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(16, 182, 141, 0.09);
    transition: background 0.2s, color 0.2s;
    margin-left: 10px;
}

.btn-suscripcion:hover {
    background: #10b68d;
    color: #fff;
    border: 1px solid #fff;
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

    .btn_editar {
        width: 50%;
    }
}

@media (max-width: 700px) {
    .suscripcion-banner {
        flex-direction: column;
        text-align: center;
        gap: 12px;
        padding: 18px 8px;
    }
    .btn-suscripcion {
        width: 100%;
        margin-left: 0;
    }
}
</style>