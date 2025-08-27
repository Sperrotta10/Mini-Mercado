<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <h2>Ingresar Cédula del Cliente</h2>
            <v-text-field
                v-model="cedula"
                label="Cédula"
                placeholder="Ejemplo: 12345678"
                type="text"
                :rules="[
                    v => !!v || 'Por favor, ingrese un número de cédula.',
                    v => /^\d{1,8}$/.test(v) || 'La cédula debe tener entre 1 y 8 dígitos numéricos.'
                ]"
                maxlength="8"
                @input="soloNumeros"
                @keyup.enter="submitCedula"
                class="input-cedula"
            />
            <div class="modal-actions">
                <button class="btn-aceptar" @click="submitCedula">Aceptar</button>
            </div>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { UserService } from '@/utils/userServices';
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/Auth';

const auth = useAuthStore();
const UserServiceInstance = new UserService();
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['cedula-submitted', 'close']);

const cedula = ref('');
const error = ref('');

function soloNumeros(e) {
    let valor = e.target.value.replace(/[^\d]/g, '');
    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }
    cedula.value = valor;
}

async function submitCedula() {
    if (!cedula.value) {
        error.value = "Por favor, ingrese un número de cédula.";
        return;
    }
    error.value = "";
    emit("cedula-submitted", cedula.value);
    const guardado = await saveCedula(cedula.value);
    if (guardado) {
        await Swal.fire('¡Listo!', 'La cédula fue guardada correctamente.', 'success');
    } else {
        await Swal.fire('Error', 'No se pudo guardar la cédula.', 'error');
    }
    closeModal();
}

function closeModal() {
    emit("close");
}

async function saveCedula(cedula) {
    try {
        const id = auth.user.user_id;
        await UserServiceInstance.updateUser(id,{ cedula: cedula });
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

// Limpiar campos al abrir/cerrar modal
watch(() => props.show, (nuevo) => {
    if (nuevo) {
        cedula.value = '';
        error.value = '';
    }
});
</script>



<style scoped>
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(16,182,141,0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: #f8fafc;
    padding: 2.5rem 2rem 2rem 2rem;
    border-radius: 18px;
    min-width: 340px;
    box-shadow: 0 8px 32px rgba(16,182,141,0.18);
    border: 1.5px solid #10b68d22;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h2 {
    color: #10b68d;
    margin-bottom: 1.5rem;
    font-weight: bold;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
}
.input-cedula {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1.5px solid #e0e7ef;
    background: #fff;
    font-size: 1.08rem;
    color: #222;
    outline: none;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(16,182,141,0.04);
    transition: border 0.2s, box-shadow 0.2s;
}
.input-cedula:focus {
    border-color: #10b68d;
    box-shadow: 0 0 0 2px #10b68d22;
}
.modal-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1.2rem;
    width: 100%;
    justify-content: center;
}
.btn-aceptar, .btn-cancelar {
    padding: 10px 28px;
    border-radius: 8px;
    border: none;
    font-size: 1.08rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}
.btn-aceptar {
    background: #10b68d;
    color: #fff;
}
.btn-aceptar:hover {
    background: linear-gradient(90deg, #018175 60%, #4cc9f0 100%);
}
.btn-cancelar {
    background: #eee;
    color: #10b68d;
}
.btn-cancelar:hover {
    background: #e0e7ef;
}
.error {
    color: #e74c3c;
    margin-top: 0.7rem;
    font-weight: 500;
    font-size: 1rem;
}
</style>