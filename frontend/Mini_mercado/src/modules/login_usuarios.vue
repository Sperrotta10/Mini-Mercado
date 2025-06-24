<template>
    <div class="back_div">
        <div class='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div class="contenedor_input">
                    <input type="text" placeholder='Nombre de Usuario' required />
                    
                </div>
                <div class="contenedor_input">
                    <input type="password" placeholder='Contraseña' required />
                </div>

                <div class="olvidar_contrasena">
                    <a href="#">¿Se olvidó la contraseña?</a>
                    <a href="#">¡Crear nuevo usuario!</a>
                </div>

                <button type='submit'>Entrar</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.back_div{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(../assets/Imagenes/cocacola.png);
    background-size: cover;
    background-position: center;
}

.wrapper{
    width: 500px;
    background-color: transparent;
    border: 2px solid rgba(255,255,255,.2);
    backdrop-filter: blur(80px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    color: white;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 10px;
}

.wrapper h1{
    font-size: 36px;
    text-align: center;
}

.wrapper .contenedor_input{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.contenedor_input input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    outline: none;
    border-radius: 40px;
    font-size: 16px;
    color: white;
    padding: 20px 45px 20px 20px;
}

.contenedor_input input::placeholder{
    color: white;
}

.wrapper .olvidar_contrasena{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin: 15px 0 30px;
}

.olvidar_contrasena a{
    color: white;
    text-decoration: none;
}

.olvidar_contrasena a:hover{
    color: white;
    text-decoration: underline;
}

.wrapper button{
    width: 100%;
    height: 45px;
    background-color: white;
    border:none;
    outline:none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: black;
    font-weight: 700;
}
</style>