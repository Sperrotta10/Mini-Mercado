<template>
  <div class="contenedor_login">
    <header class="header">
      <Logo_con_link />
    </header>
    
    <main class="main_contenido">
      <div class="contenido_login">
        <div class='login-wrapper'>
          <v-form ref="LoginForm" @submit.prevent="onLogin">
            <h2>Login</h2>
            <div class="contenedor_input">
              <v-text-field
                v-model="loginData.email"
                :rules="email_rules"
                placeholder="Correo Electrónico"
                required
                prepend-icon="mdi-account"
                autocomplete="username"
              />
            </div>
            <div class="contenedor_input">
              <v-text-field
                v-model="loginData.password"
                :rules="password_rules"
                placeholder="Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock"
                autocomplete="current-password"
              />
            </div>

            <div class="contenido_links">
              <RouterLink to="/crear_usuario">Regístrese ahora</RouterLink>
              <a href="#">¿Olvidó su contraseña?</a>
            </div>

            <div class="contenido_mostra_otro_acceso">
              <div class="linea_separado"></div>
              <span>O desea entrar con</span>
              <div class="linea_separado"></div>
            </div>

            <v-btn class="contenido_extra_acceso" color="white" @click="loginWithGoogle">
              <div class="contenedor_imagen">
                <img :src="Icon_google" alt="icon">
              </div>
              <span>Google</span>
            </v-btn>

            <v-btn type="submit" class="btn">Entrar</v-btn>
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
import { ref } from 'vue'
import Logo_con_link from './logo_con_link.vue'
import Icon_google from '@/assets/Imagenes/google.png'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth.js'
import Swal from 'sweetalert2'

const router = useRouter()
const loginData = ref({
  email: '',
  password: ''
})
const LoginForm = ref(null)
const AuthStore = useAuthStore()

const email_rules = [
  v => !!v || 'El correo electrónico es requerido',
  v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
]
const password_rules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'Mínimo 6 caracteres'
]


const onLogin = async () => {
  const result = await LoginForm.value?.validate()
  if (!result || !result.valid) {
    alert('Por favor corrige los errores antes de continuar')
    return
  }
  // Prepara los datos para enviar
  const dataToSend = {
    email: loginData.value.email,
    password: loginData.value.password,
  }
  console.log('Datos a enviar:', dataToSend)
  // Llama al servicio de login
  const response = await AuthStore.login({email: dataToSend.email, password: dataToSend.password})
  if (response) {
    await Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido de nuevo ${AuthStore.user.user_name ?? 'usuario'}.`,
        confirmButtonColor: '#3085d6',
      })
    router.push('/') // Redirige a la página principal
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Credenciales incorrectas. Inténtalo de nuevo.',
      confirmButtonColor: '#d33',
    })
  }
}


function loginWithGoogle() {
  // Lógica para login con Google
}
</script>

<style scoped>
.contenedor_login {
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

.contenido_login {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.login-wrapper {
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

.login-wrapper h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.contenedor_input {
  position: relative;
  width: 100%;
  margin: 1.5rem 0;
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

.contenido_links {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin: 1rem 0 1.5rem;
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

.login-wrapper .btn {
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

.login-wrapper .btn:hover {
  background-color: #004C45;
  transform: translateY(-2px);
}

.footer {
  background-color: #004C45;
  color: white;
  text-align: center;
  padding: 1rem;
}

.footer p{
  margin-top: 30px;
}

.contenido_mostra_otro_acceso{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.contenido_mostra_otro_acceso span{
  margin: 0px 10px;
  font-size: 1rem;
}

.linea_separado{
  width: 30%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.4);
}

.contenido_extra_acceso{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-color: #004C45;
  margin: 1.5rem 0;
  gap: 10px;
  padding: 5px 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.9);
}

.contenido_extra_acceso:hover{
  background-color: rgba(0, 0, 0, 0.1);
}
.contenedor_imagen img{
  width: 24px;
  height: 24px;
}

/* Area de Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    padding: 1.5rem;
    margin: 0.5rem;
  }
  
  .login-wrapper h2 {
    font-size: 1.5rem;
  }
  
  .contenido_links {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .linea_separado{
    width: 25%;
  }
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 1rem;
  }
  
  .contenedor_input input {
    padding: 0.75rem;
  }

  .linea_separado{
    width: 15%;
  }
}
</style>