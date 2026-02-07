<template>
  <div class="contenedor_registro">
    <header class="header">
      <Logo_con_link />
    </header>
    
    <main class="main_contenido">
      <div class="contenido_registro">
        <div class='registro-wrapper'>
          <v-form ref="RegisterForm" @submit.prevent="onSubmit">
            <h2>Registrar nuevo usuario</h2>
            
            <div class="contenedor_input">
              <v-text-field type="email" v-model="registerData.email" :rules="email_rules" placeholder='Correo electrónico' required />
            </div>
            
            <div class="contenedor_input">
              <v-text-field type="text" v-model="registerData.username" :autocomplete="'MSJuser123'" :rules="username_rules" placeholder='Nombre de usuario' required />
            </div>
            
            <div class="contenedor_input">
              <v-text-field type="password" v-model="registerData.password" :autocomplete="'New@Password@123'" :rules="password_rules" placeholder='Contraseña' required />
            </div>
            
            <div class="contenedor_input">
              <v-text-field type="password" :autocomplete="'New@Password@123'" v-model="registerData.confirmPassword" :rules="confirmPassword_rules" placeholder='Confirmar contraseña' required />
            </div>
            
            <div class="contenedor_terminos">
              <input type="checkbox" id="terminos" v-model="terminosAceptados" required />
              <label for="terminos">
                <RouterLink to="/terminos"> Términos y condiciones</RouterLink>
              </label>
            </div>
            
            <button type='submit' class="btn">Registrarse</button>
            
            <div class="contenido_links">
              <RouterLink to="/login"> ¿Ya tienes una cuenta? Inicia sesión</RouterLink>
            </div>
          </v-form>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <p>© 2025 MSJ Market</p>
    </footer>    
  </div>
</template>

<script setup>
import Logo_con_link from './logo_con_link.vue'

import { ref } from 'vue'
import { UserService } from '../utils/userServices.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const RegisterForm = ref(null)
const terminosAceptados = ref(false) 
const UserServiceInstance = new UserService()

const registerData = ref({
  nombre_completo: '',
  cedula: '',
  email: '',
  telefono: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const router = useRouter()


const email_rules = ref([
  v => !!v || 'El correo electrónico es obligatorio',
  v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
])

const username_rules = ref([
  v => !!v || 'El nombre de usuario es obligatorio',
  v => (v && v.length <= 20) || 'El nombre de usuario debe tener menos de 20 caracteres'
])

const password_rules = ref([
  v => !!v || 'La contraseña es obligatoria',
  v => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres'
])

const confirmPassword_rules = ref([
  v => !!v || 'La confirmación de contraseña es obligatoria',
  v => v === registerData.value.password || 'Las contraseñas no coinciden'
])



const onSubmit = async () => {
  const result = await RegisterForm.value?.validate();

  if (!result || !result.valid) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor corrige los errores antes de continuar'
    });
    return;
  }
  if (!terminosAceptados.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'Términos y condiciones',
      text: 'Debes aceptar los términos y condiciones'
    });
    return;
  }

  const dataToSend = {
    email: registerData.value.email,
    username: registerData.value.username,
    password: registerData.value.password,
  };
  const response = await UserServiceInstance.createUser(dataToSend);

  if (response) {
    await Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Usuario registrado correctamente'
    });
    router.push('/login');
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al registrar el usuario'
    });
  }
}

</script>

<style scoped>
.contenedor_registro {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
}

.main_contenido {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-image: url(../assets/Imagenes/login_backimage.png);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.main_contenido::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.contenido_registro {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.registro-wrapper {
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255);
  border: 2px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(50px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: black;
  border-radius: 15px;
  padding: 2rem;
  margin: 0;
}

.registro-wrapper h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.contenedor_input {
  position: relative;
  width: 100%;
  margin: 1rem 0;
}

.contenedor_input input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 0, 0, 0.2);
  outline: none;
  border-radius: 30px;
  font-size: 1rem;
  color: black;
  transition: all 0.3s ease;
}

.contenedor_input input:focus {
  border-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.contenedor_input input::placeholder {
  color: rgba(0, 0, 0, 0.7);
}

.contenedor_terminos {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.contenedor_terminos input {
  margin-right: 0.5rem;
}

.contenido_links {
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  margin: 1.5rem 0 0;
}

.contenido_links a {
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
}

.contenido_links a:hover {
  color: rgba(0, 0, 0, 0.8);
  text-decoration: underline;
}

.registro-wrapper .btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #10b68d;
  border: none;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  transition: all 0.3s ease;
}

.registro-wrapper .btn:hover {
  background-color: #004C45;
  transform: translateY(-2px);
}

.footer {
  background-color: #004C45;
  color: white;
  text-align: center;
  padding: 1rem;
}

.footer p {
  margin-top: 30px;
}

.contenedor_terminos label {
  margin-left: 0.5rem;
  color: #004C45;
  text-decoration: none;
}

/* Area de Responsive */
@media (max-width: 768px) {
  .registro-wrapper {
    padding: 1.5rem;
    margin: 0.5rem;
  }
  
  .registro-wrapper h2 {
    font-size: 1.5rem;
  }
  
  .contenedor_input {
    margin: 0.8rem 0;
  }
  
  .contenedor_terminos {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .registro-wrapper {
    padding: 1rem;
  }
  
  .contenedor_input input {
    padding: 0.75rem;
  }
  
  .registro-wrapper h2 {
    font-size: 1.3rem;
  }
  
  .contenido_links {
    font-size: 0.8rem;
  }
}
</style>