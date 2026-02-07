<template>
    <div class="carousel-management-card">
        <h2 class="card-title">Publicidad de Imagen</h2>

        <div class="current-carousel">
            <h3 class="section-title">Publicidad Actual</h3>
            <div class="carousel-container">
                <div v-for="(image, index) in carouselImages" :key="index" class="carousel-item">
                    <img :src="image.image" :alt="'Imagen' + (index + 1)" class="carousel-image">
                    <button @click="removeImage(image.publicity_id)" class="remove-btn">Borrar</button>
                </div>
                <div v-if="carouselImages.length === 0" class="empty-message">
                    No tiene ningún imagen de publicidad
                </div>
            </div>
        </div>

        <div class="add-carousel">
            <h3 class="section-title">Agregar Nueva publicidad</h3>
            <div class="upload-area" @click="triggerFileInput">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="file-input">
                <div v-if="!newImagePreview" class="upload-prompt">
                    <span>Click para subir nueva Publicidad 🎉</span>
                </div>
                <img v-else :src="newImagePreview" class="preview-image">
            </div>
            <button @click="addNewImage" :disabled="!newImageFile" class="add-btn">
                Agregar
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

import { publicityService } from '@/utils/publicityService';

const carouselImages = ref([]);
const fileInput = ref(null);
const newImageFile = ref(null);
const newImagePreview = ref('');

// Selección de imagen
const triggerFileInput = () => {
    fileInput.value.click();
};

onMounted(async () => {
    try {
        const images = await publicityService.getPublicities();
        if (images && Array.isArray(images.data) && images.data.length > 0) {
            carouselImages.value = images.data.map(img => ({
                image: img.image,
                publicity_id: img.publicity_id
            }));
        } else {
            carouselImages.value = [];
        }
    } catch (error) {
        console.error('Error al cargar las imágenes de publicidad:', error);
        carouselImages.value = [];
    }
});
// Procesar subir Imagen
const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        newImageFile.value = file;
        newImagePreview.value = URL.createObjectURL(file);
    }
};

// Agregar Imagen al Carousel con feedback de SweetAlert
const addNewImage = async () => {
    if (!newImageFile.value) return;

    const formsito = new FormData();
    formsito.append('image', newImageFile.value);

    try {
        const result = await publicityService.createPublicity(formsito);
        console.log(result);
        if (result) {
            carouselImages.value.push({
                image: result.data.image,
                publicity_id: result.data.publicity_id
            });
            await Swal.fire({
                icon: 'success',
                title: '¡Imagen subida!',
                text: 'La publicidad fue agregada correctamente.',
                timer: 1800,
                showConfirmButton: false
            });
        } else {
            throw new Error('No se recibió la URL de la imagen');
        }
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo subir la imagen de publicidad.'
        });
    }

    newImageFile.value = null;
    newImagePreview.value = '';
    fileInput.value.value = '';
};

// Eliminar imagen con confirmación
const removeImage = async (publicity_id) => {
    const confirm = await Swal.fire({
        title: '¿Eliminar esta publicidad?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#10b68d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
        await publicityService.deletePublicity(publicity_id);
        carouselImages.value = carouselImages.value.filter(image => image.publicity_id !== publicity_id);
        await Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'La publicidad fue eliminada.',
            timer: 1200,
            showConfirmButton: false
        });
    }
};
</script>

<style scoped>
.carousel-management-card {
    width: 100%;
    margin: 20px auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 22px;
    text-align: center;
}

.section-title {
    margin: 15px 0;
    color: #444;
    font-size: 18px;
}

.carousel-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-bottom: 25px;
}

.carousel-item {
    position: relative;
    border: 1px solid #eee;
    border-radius: 6px;
    overflow: hidden;
}

.carousel-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
}

.remove-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
}

.remove-btn:hover {
    background: rgba(255, 0, 0, 0.9);
}

.empty-message {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    color: #888;
    border: 1px dashed #ddd;
    border-radius: 6px;
}

.upload-area {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 15px;
    transition: border-color 0.2s;
}

.upload-area:hover {
    border-color: #10b68d;
}

.file-input {
    display: none;
}

.upload-prompt {
    color: #666;
    font-size: 16px;
}

.upload-prompt span {
    display: inline-block;
    padding: 8px 15px;
    background: #f5f5f5;
    border-radius: 4px;
}

.preview-image {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
}

.add-btn {
    width: 100%;
    padding: 12px;
    background-color: #10b68d;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-btn:hover {
    background-color: #018175;
}

.add-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>