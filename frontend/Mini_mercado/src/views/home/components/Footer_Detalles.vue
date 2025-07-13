<template>
    <footer>
      <div class="contenedor_contenido_footer">
          <div class="contendor_contenido_texto">
            <h2>Dirección y Horario:</h2>
            <p><img :src="icon_direccion" alt="direccion"> Dirección: San Diego, Calle Mavuika N°1</p>
            <p><img :src="icon_horario" alt="direccion"> Horario: 8:00-21:00</p>
          </div>
          
          <div class="contendor_contenido_texto"> 
            <h2>Contacto:</h2>
            <p><img :src="icon_correo" alt="correo"> msjsupemarket@pro.com</p>
            <p><img :src="icon_telefono" alt="telefono"> 0212-8888888</p>
          </div>
      </div>

      <div class="footer_main_titulo">
        <span>© 2025 MSJ Market</span>
      </div>

    </footer>
</template>

<script setup>
import icon_telefono from '@/assets/Imagenes/footer/telefono.png'
import icon_correo from '@/assets/Imagenes/footer/correo_png.png'
import icon_direccion from '@/assets/Imagenes/footer/direccion icono.png'
import icon_horario from '@/assets/Imagenes/footer/horario.png'
</script>

<style scoped>
footer {
    background: #004C45;
    color: #fff;
    padding: 50px 5% 20px;
    margin-top: 50px;
    text-align: center;
}

.contenedor_contenido_footer{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 1400px; 
    margin: 0 auto;
}

.footer_main_titulo{
    margin-top: 20px;
}

.contendor_contenido_texto{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    text-align: left;
}

.contendor_contenido_texto p{
    display: flex;
    align-items: center;
    gap: 5px;
}

.contendor_contenido_texto img{
    width: 20px;
    height: 20px;
}

.contendor_contenido_texto h2{
    text-align: left;
}

@media (max-width: 768px) {
    .contenedor_contenido_footer{
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }

    .footer_main_titulo{
        margin-top: 40px;
    }

    .contendor_contenido_texto{
        position: relative;
        margin: 0px;
    }
}

@media (max-width: 576px) {
    .contenedor_contenido_footer{
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }

    .footer_main_titulo{
        margin-top: 40px;
    }

    .contendor_contenido_texto{
        position: relative;
        margin: 0px;
    }
}
</style>
