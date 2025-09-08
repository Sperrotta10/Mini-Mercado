<template>
  <div class="terminos-container">
    <div class="terminos-card">
      <h1 class="titulo">Términos y Condiciones</h1>
      <p class="intro">
        Bienvenido al sistema web de gestión de carritos personalizables de Mini Mercado. Al utilizar este sitio, aceptas los siguientes términos y condiciones:
      </p>
      <ol class="lista-terminos">
        <li>
          <strong>Uso del sistema:</strong> El sistema está destinado exclusivamente para la gestión y compra de productos a través de carritos personalizados.
        </li>
        <li>
          <strong>Registro de usuarios:</strong> Para acceder a todas las funcionalidades, debes registrarte con información verídica y mantener tus datos actualizados.
        </li>
        <li>
          <strong>Privacidad:</strong> Tus datos personales serán tratados de acuerdo a nuestra política de privacidad y no serán compartidos con terceros sin tu consentimiento.
        </li>
        <li>
          <strong>Responsabilidad del usuario:</strong> Eres responsable de la seguridad de tu cuenta y de todas las actividades realizadas bajo tu usuario.
        </li>
        <li>
          <strong>Ofertas y suscripciones:</strong> Las ofertas y beneficios premium están sujetos a condiciones específicas y pueden cambiar sin previo aviso.
        </li>
        <li>
          <strong>Disponibilidad de productos:</strong> Los productos y precios pueden variar según disponibilidad y promociones vigentes.
        </li>
        <li>
          <strong>Prohibiciones:</strong> No está permitido el uso indebido del sistema, incluyendo fraudes, manipulación de datos o cualquier actividad ilegal.
        </li>
        <li>
          <strong>Modificaciones:</strong> MSJMarket se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta página.
        </li>
        <li>
          <strong>Contacto:</strong> Para dudas o consultas, puedes comunicarte con nuestro equipo de soporte a través de la información proporcionada en el sitio.
        </li>
      </ol>
      <p class="aceptacion">
        Al continuar utilizando el sistema, confirmas que has leído y aceptado estos términos y condiciones.
      </p>
    </div>
  </div>
</template>

<script setup>
// No se requiere lógica para esta página
</script>

<style scoped>
.terminos-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #e0f7fa 0%, #f8fffc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 10px;
}

.terminos-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(16, 182, 141, 0.13);
  max-width: 600px;
  width: 100%;
  padding: 36px 32px;
  color: #222;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.titulo {
  color: #10b68d;
  font-size: 2.1rem;
  margin-bottom: 18px;
  font-weight: bold;
  text-align: center;
}

.intro {
  font-size: 1.1rem;
  margin-bottom: 18px;
  color: #444;
  text-align: center;
}

.lista-terminos {
  margin: 0 0 18px 0;
  padding-left: 18px;
  color: #333;
}

.lista-terminos li {
  margin-bottom: 12px;
  line-height: 1.6;
}

.aceptacion {
  font-size: 1rem;
  color: #10b68d;
  font-weight: 500;
  text-align: center;
  margin-top: 18px;
}
</style>