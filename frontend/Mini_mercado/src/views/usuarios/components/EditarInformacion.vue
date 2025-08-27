<template>
    <div class="carta_usuario">
        <h2 class="carta_titulo">Informacion Personal</h2>

        <v-form ref="editForm" @submit.prevent="Funcion_Entregar" class="registrar_formulario">
            <div class="form-group">
                <label for="name">Nombre Completo</label>
                <v-text-field
                    id="name"
                    v-model="form.nombre_completo"
                    :rules="name_rules"
                    placeholder="Ingresa tu nombre completo"
                    required
                />
            </div>

            <div class="form-group">
                <label for="cedula">Cedula</label>
                <v-text-field
                    id="cedula"
                    v-model="form.cedula"
                    :rules="cedula_rules"
                    placeholder="Ingresa Cedula"
                    required
                />
            </div>

            <div class="form-group">
                <label for="telefono">Número de telefono</label>
                <v-text-field
                    id="telefono"
                    v-model="form.telefono"
                    :rules="telefono_rules"
                    type="tel"
                    placeholder="Ingresa Número de telefono (Ej: 0412-1234567)"
                    maxlength="12"
                    required
                />
            </div>

            <div class="form-group">
                <label for="username">User Name:</label>
                <v-text-field
                    id="username"
                    v-model="form.username"
                    :rules="username_rules"
                    placeholder="Ingresa Nombre de usuario"
                    required
                />
            </div>

            <div class="buttons">
                <v-btn @click="goBack" class="btn_editar" color="primary" variant="outlined">Volver</v-btn>
                <v-btn type="submit" class="submit-btn" color="primary">Guardar Cambios</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/Auth';
import { UserService } from '@/utils/userServices';
const authStore = useAuthStore();
const router = useRouter();
const editForm = ref(null);
const form = ref({});
const userData = ref({});
const UserServiceInstance = new UserService();


function formatTelefono(telefono) {
    // Si ya tiene guion, no lo cambia
    if (!telefono) return '';
    if (telefono.includes('-')) return telefono;
    // Si tiene 11 dígitos, lo formatea
    if (/^0\d{10}$/.test(telefono)) {
        return telefono.slice(0, 4) + '-' + telefono.slice(4);
    }
    return telefono;
}

onMounted(async () => {
    userData.value = authStore.userData || {};
    form.value.nombre_completo = userData.value.nombre_completo || '';
    form.value.cedula = userData.value.cedula || '';
    form.value.telefono = formatTelefono(userData.value.telefono) || '';
    form.value.username = userData.value.username || '';
});

const name_rules = [
    v => !!v || 'El nombre es requerido',
    v => v.length >= 3 || 'Mínimo 3 caracteres'
];
const cedula_rules = [
    v => !!v || 'La cédula es requerida',
    v => /^\d+$/.test(v) || 'Solo números'
];
const telefono_rules = [
    v => !!v || 'El teléfono es requerido',
    v => /^0\d{3}-\d{7}$/.test(v) || 'Formato: 0412-1234567',
    v => v.length === 12 || 'Debe tener 12 caracteres incluyendo el guion',
];
const username_rules = [
    v => !!v || 'El nombre de usuario es requerido',
    v => v.length >= 3 || 'Mínimo 3 caracteres'
];

function goBack() {
    router.back();
}


import Swal from 'sweetalert2'



const Funcion_Entregar = async () => {
    const result = await editForm.value?.validate();
    if (!result || !result.valid) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor corrige los errores antes de continuar'
        });
        return;
    }

    if (!userData.value.user_id) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el usuario para actualizar'
        });
        return;
    }

    try {
        const updateResult = await UserServiceInstance.updateUser(userData.value.user_id, form.value);
        if (updateResult) {
            await Swal.fire({
                icon: 'success',
                title: '¡Datos actualizados!',
                text: 'Tus datos fueron guardados correctamente'
            });
            userData.value = await authStore.GetThisUserData();
            goBack();
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al enviar datos'
            });
        }
    } catch (e) {
        console.error('Error al actualizar datos:', e);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado'
        });
    }
};

</script>

<style scoped>
.carta_usuario {
    width: 100%;
    margin: 20px auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    width: 90%;
}

.carta_titulo {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 22px;
    text-align: center;
}

.registrar_formulario {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

}

.form-group label {
    font-size: 14px;
    color: #555;
}

.form-input {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-input:focus {
    outline: none;
    border-color: #10b68d;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.buttons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-self: center;
}

.submit-btn {
    margin-top: 10px;
    padding: 12px;
    background-color: #10b68d;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 40%;
}

.submit-btn:hover {
    background-color: #018175;
}

.btn_editar {
    margin-top: 10px;
    padding: 12px;
    
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 40%;
}


.btn_editar:hover {
    background-color: #01814c;
    color: white;   
}
</style>