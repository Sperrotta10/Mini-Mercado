<template>
  <div class="contenedor_login">
    <header class="header">
      <Logo_con_link />
    </header>
    
    <main class="main_contenido">
      <div class="contenido_login">
        <div class='login-wrapper'>
          <form action=''>
            <h2>Login</h2>
            <div class="contenedor_input">
              <input type="text" placeholder='Nombre de Usuario' required />
            </div>
            <div class="contenedor_input">
              <input type="password" placeholder='Contraseña' required />
            </div>

            <div class="contenido_links">
              <a href="#">¿Se olvidó la contraseña?</a>
              <a href="#">¡Crear nuevo usuario!</a>
            </div>

            <button type='submit'>Entrar</button>
          </form>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <span>© 2025 MSJ Market</span>
    </footer>
  </div>
</template>

<script setup>
import Logo_con_link from './logo_con_link.vue' 
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
    justify-content: center;
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
  padding: 2.5rem;
  margin: 1rem;
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
  border-color: rgba(255, 255, 255, 0.4);
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

.login-wrapper button {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: none;
  outline: none;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1rem;
  color: black;
  font-weight: 700;
  transition: all 0.3s ease;
}

.login-wrapper button:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.footer {
  background-color: #004C45;
  color: white;
  text-align: center;
  padding: 1rem;
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
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 1rem;
  }
  
  .contenedor_input input {
    padding: 0.75rem;
  }
}
</style>