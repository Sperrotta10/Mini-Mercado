<template>
    <form @submit.prevent="handleSubmit" class="contenedor_formulario">
    <div class="form-group">
      <label for="name">Nombre:</label>
      <input id="name" v-model="formData.name" type="text" placeholder="Ingrese su nombre" required/>
    </div>

    <div class="form-group">
      <label for="precio">Precio:</label>
      <v-text-field
        id="precio"
        v-model="formData.precio"
        type="number"
        :rules="[precioPositivoRule]"
        label="Ingrese su precio"
        min="0"
        step="0.01"
        hide-details="auto"
        required
      />
    </div>

    <div class="form-group">
    <label for="stock">Stock:</label>
    <v-text-field
      id="stock"
      v-model="formData.stock"
      type="number"
      :rules="[enteroPositivoRule]"
      label="Ingrese su cantidad disponible"
      min="0"
      step="1"
      hide-details="auto"
      required
    />
  </div>

  <div class="form-group">
    <label for="min_stock">Mínimo Stock:</label>
    <v-text-field
      id="min_stock"
      v-model="formData.min_stock"
      type="number"
      :rules="[enteroPositivoRule]"
      label="Ingrese su cantidad mínimo stock"
      min="0"
      step="1"
      hide-details="auto"
      required
    />
  </div>
  
    <div class="form-group">
      <label for="category">Categoría:</label>
      <select id="category" v-model="formData.category" required>
        <option disabled value="">Seleccione una categoría</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
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
import { ProductService } from '@/utils/productServices';
import { ref } from 'vue';
import Swal from 'sweetalert2'; 

const productServiceInstance = new ProductService();
// Datos del formulario
const formData = ref({
  name: '',
  precio:'',
  stock:'',
  min_stock:'',
  category: '',
  image: null,
});

// Opciones de categoría (puedes cambiarlas según tus necesidades)
const categories = ref([
  { id: 1, name: 'Lácteos' },
  { id: 2, name: 'Frutas y Verduras' },
  { id: 3, name: 'Carnicería' },
  { id: 4, name: 'Abarrotes' },
  { id: 5, name: 'Bebidas' },
  { id: 6, name: 'Snacks y Dulces' },
  { id: 7, name: 'Limpieza' }
]);
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

const enteroPositivoRule = value => {
  if (value === '' || value === null || value === undefined) return 'Este campo es requerido';
  if (!/^\d+$/.test(value)) return 'Solo números enteros positivos';
  if (parseInt(value) < 0) return 'No se permiten valores negativos';
  return true;
};

const precioPositivoRule = value => {
  if (value === '' || value === null || value === undefined) return 'Este campo es requerido';
  if (isNaN(value)) return 'Debe ser un número';
  if (parseFloat(value) < 0) return 'No se permiten valores negativos';
  return true;
};

const handleSubmit = async () => {
  try {
    const form = new FormData();
    form.append('name', String(formData.value.name));
    form.append('price', String(formData.value.precio));
    form.append('stock', String(formData.value.stock));
    form.append('stock_min', String(formData.value.min_stock));
    form.append('categoria_id', String(formData.value.category));
    if (imageFile.value) {
      form.append('image', imageFile.value); // Aquí va el archivo real
    }

    // Cambia tu método createProduct para aceptar FormData y no JSON
    const response = await productServiceInstance.createProduct(form);
    console.log(response)
    if (response.message=="Producto creado") {
      Swal.fire({
        icon: 'success',
        title: 'Producto registrado',
        text: 'El producto se registró correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
      resetForm();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response?.message || 'No se pudo registrar el producto.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.message || 'Ocurrió un error al registrar el producto.',
    });
  }
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