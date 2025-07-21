<template>
    <div class="carta_empleado">
        <h2 class="carta_titulo">Registrar nuevo empleado</h2>

        <form @submit.prevent="Funcion_Entregar" class="registrar_formulario">
            <!-- Nombre ingreso -->
            <div class="form-group">
                <label for="name">Nombre</label>
                <input id="name" v-model="form.name" type="text" required placeholder="Ingresa Nombre" class="form-input" />
            </div>

            <!-- Cedula -->
            <div class="form-group">
                <label for="cedula">Cedula</label>
                <input id="cedula" v-model="form.cedula" type="text" required placeholder="Ingresa Cedula" class="form-input" />
            </div>

            <!-- Correo -->
            <div class="form-group">
                <label for="email">Correo</label>
                <input id="email" v-model="form.email" type="email" required placeholder="Ingresa Correo" class="form-input" />
            </div>

            <!-- Telefono -->
            <div class="form-group">
                <label for="phone">Número de telefono</label>
                <input id="phone" v-model="form.phone" type="tel" required placeholder="Ingresa Número de telefono" class="form-input" />
            </div>

            <!-- Contraseña -->
            <div class="form-group">
                <label for="contrasena">Contraseña para Loguear</label>
                <input id="contrasena" v-model="form.contrasena" type="text" required placeholder="Ingresa contraseña" class="form-input" />
            </div>

            <div class="form-group">
                <label for="contrasena">Confirmar la contraseña</label>
                <input id="contrasena" v-model="form.contrasena" type="text" required placeholder="Confirma de nuevo la contraseña" class="form-input" />
            </div>

            <!-- Enviar -->
            <button type="submit" class="submit-btn">
                Registrar
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    phone: '',
    cedula:'',
    contrasena:''
});

const Funcion_Entregar = () => {
    console.log('Información de empleado:', form.value);

    // reset
    form.value = {
        name: '',
        email: '',
        phone: ''
    };
};
</script>

<style scoped>
.carta_empleado {
    width: 100%;
    margin: 20px auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
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
}

.submit-btn:hover {
    background-color: #018175;
}
</style>