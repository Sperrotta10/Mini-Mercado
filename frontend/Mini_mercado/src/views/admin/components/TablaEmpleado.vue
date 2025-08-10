<template>
    <div class="carta">
        <div class="contenedor_carta">
            <div class="tabla_responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Operación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="empleado in empleados" :key="empleado.user_id">
                            <td>{{ empleado.user_id }}</td>
                            <td>{{empleado.email}}</td>
                            <td>
                                <span :style="{ color: empleado.status ? 'green' : 'orange' }">
                                    {{ empleado.status ? 'Activo' : 'Inactivo 👻' }}
                                </span>
                            </td>
                            <td class="contendor_separador">
                                <button class="btn_general" @click="toggleEmpleadoStatus(empleado)"><i class="deshabilitar-btn fas fa-user-slash"><span>
                                    {{ empleado.status == 1 ? 'Deshabilitar' : 'Habilitar' }}
                                </span></i></button>
                            </td>
                        </tr>
                        <tr v-if="empleados.length === 0">
                            <td colspan="4" style="text-align:center;">No hay empleados para mostrar.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UserService } from '@/utils/userServices'; 
import Swal from 'sweetalert2'; 

const empleados = ref([]);
const userService = new UserService();
async function cargarEmpleados() {
    try {
        const res = await userService.getAll();
        // Filtra por rol_id == 3 (empleados)
        empleados.value = (res.data || []).filter(u => u.rol_id === 2);
    } catch (e) {
        empleados.value = [];
        console.error('Error al cargar empleados:', e);
    }
}

async function toggleEmpleadoStatus(empleado) {
    const accion = empleado.status == 1 ? 'deshabilitar' : 'habilitar';
    const confirm = await Swal.fire({
        title: `¿Seguro que deseas ${accion} a este empleado?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b68d',
        cancelButtonColor: '#e74c3c',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    });
    if (!confirm.isConfirmed) return;

    try {
        const newStatus = empleado.status == 1 ? 0 : 1;
        const data = {
            status:newStatus
        }
        console.log(empleado.user_id)
        await userService.updateUser(empleado.user_id, data);
        empleado.status = newStatus;
        Swal.fire(
            '¡Listo!',
            `Empleado ${accion === 'deshabilitar' ? 'deshabilitado' : 'habilitado'} correctamente.`,
            'success'
        );
    } catch (e) {
        console.error('Error al cambiar estado del empleado:', e);
        Swal.fire('Error', 'No se pudo cambiar el estado del empleado.', 'error');
    }
}

onMounted(() => {
    cargarEmpleados();
});
</script>

<style scoped>
/* Css para el diseño */
.carta {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    overflow: hidden;
}

.carta_header {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carta_header h3 {
    font-size: 1.3rem;
    color: var(--dark);
}

.contenedor_carta {
    padding: 20px;
}

/* La tabla */
.tabla_responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

th {
    background-color: #f8f9fa;
    color: black;
    font-weight: 600;
}

tr:hover {
    background-color: rgba(67, 97, 238, 0.03);
}

.contendor_separador {
    width: 100%;
    display: flex;
    gap: 20px;
}

.btn_general {
    background-color: #10b68d;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
}

.btn_general i {
    color: white;
}

.deshabilitar-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
}
</style>