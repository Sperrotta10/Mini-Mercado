<template>
    <form @submit.prevent="handleSubmit" class="contenedor_formulario">
    <div class="form-group">
      <label for="name">Nombre:</label>
      <input id="name" v-model="formData.name" type="text" placeholder="Ingrese su nombre" required/>
    </div>

    <div class="form-group">
      <label for="precio">Precio:</label>
      <input id="precio" v-model="formData.precio" type="text" placeholder="Ingrese su precio"/>
    </div>

    <div class="form-group">
      <label for="stock">Stock:</label>
      <input id="stock" v-model="formData.stock" type="text" placeholder="Ingrese su cantidad disponible"/>
    </div>

    <div class="form-group">
      <label for="min_stock">Mínimo Stock:</label>
      <input id="min_stock" type="text" placeholder="Ingrese su cantidad mínimo stock"/>
    </div>
  
    <div class="form-group">
      <label for="category">Categoría:</label>
      <select id="category" v-model="formData.category">
        <option disabled value="">Seleccione una categoría</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="image">Imagen:</label>
      <input id="image" type="file" accept="image/*" @change="handleImageUpload"/>
      <div v-if="imagePreview" class="image-preview-container">
        <div class="image-preview">
        <img :src="imagePreview" alt="Vista previa de la imagen" />
        <button type="button" @click="removeImage" class="remove-image-btn">
          X
        </button>
      </div>
      </div>
      
    </div>

    <div class="form-actions">
      <button type="submit">Enviar</button>
      <button type="button" @click="resetForm" class="reset-btn">
        Borrar Todo
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

// Datos del formulario
const formData = ref({
  name: '',
  precio:'',
  stock:'',
  category: '',
});

// Opciones de categoría (puedes cambiarlas según tus necesidades)
const categories = ref(['Frutas', 'Vegetales', 'Chucheria', 'Refresco', 'Helados','Carniceria']);

// Vista previa de la imagen
const imagePreview = ref(null);
const imageFile = ref(null);

// Manejar subida de imagen
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.match('image.*')) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Eliminar solo la imagen
const removeImage = () => {
  imagePreview.value = null;
  imageFile.value = null;
  // También limpiamos el input file
  document.getElementById('image').value = '';
};

// Resetear todo el formulario
const resetForm = () => {
  formData.value = {
    name: '',
    category: '',
  };
  removeImage();
};

// Manejar envío del formulario
const handleSubmit = () => {
  // Aquí puedes manejar el envío de los datos
  console.log({
    ...formData.value,
    image: imageFile.value,
  });
  // resetForm(); // Opcional: resetear después de enviar
};
</script>

<style scoped>
.contenedor_formulario {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.image-preview-container {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  position: relative; /* Añadido para contener el botón absolutamente posicionado */
  padding: 10px; /* Espacio extra para el botón */
}

.image-preview {
  position: relative;
  width: 240px;
  height: 240px;
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f5f5f5;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Mantiene la proporción de la imagen */
}

.remove-image-btn {
  position: absolute;
  top: 0px; 
  right: 0px; 
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  z-index: 10; /* Asegura que esté por encima de todo */
  box-shadow: 0 0 5px rgba(0,0,0,0.3); /* Sombra para mejor visibilidad */
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button[type='submit'] {
  background-color: #10b68d;
  color: white;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}
</style>