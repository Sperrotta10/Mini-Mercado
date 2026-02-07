<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div id="inventory" class="page">
    <div class="card">
      <div class="card-body">
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-warehouse"></v-icon>
        &nbsp; Inventario
        <v-spacer></v-spacer>
        <v-btn color="error" variant="outlined" class="mr-2" @click="generarPDFCompleto">
            <v-icon left>mdi-file-pdf-box</v-icon>
            Exportar PDF
        </v-btn>
        <v-text-field
          v-model="search"
          density="compact"
          label="Buscar producto"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          class="search-inventario"
        />
      </v-card-title>
    <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="productos"
          :items-per-page="5"
          class="elevation-1"
          :loading="loading"
          :search="search"
          loading-text="Cargando productos..."
          
        >
          <template #item.image="{ item }">
            <div class="mini-image-box">
              <img :src="item.image" alt="img" v-if="item.image" />
            </div>
          </template>
        </v-data-table>
        
      </div>
      <div class="card" style="margin-top: 32px;">
        <div class="card-body">
          <h3 style="color:#e74c3c; margin-bottom: 18px;">Productos con bajo stock</h3>
          <table class="table-responsive">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prod in productos.filter(p => Number(p.stock) <= Number(p.stock_min))" :key="prod.product_id">
                <td>
                  <div class="mini-image-box">
                    <img :src="prod.image" alt="img" v-if="prod.image" />
                  </div>
                </td>
                <td>{{ prod.name }}</td>
                <td>{{ prod.stock }}</td>
                <td>{{ prod.stock_min }}</td>
                <td style="min-width:120px;">
                  <div class="progress-container">
                    <div
                      class="progress-bar"
                      :class="{
                        'bg-danger': prod.stock <= prod.stock_min,
                        'bg-warning': prod.stock > prod.stock_min && prod.stock <= prod.stock_min * 1.5,
                        'bg-success': prod.stock > prod.stock_min * 1.5
                      }"
                      :style="{ width: Math.max(5, Math.min(100, (prod.stock / (prod.stock_min || 1)) * 100)) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
              <tr v-if="productos.filter(p => Number(p.stock) <= Number(p.stock_min)).length === 0">
                <td colspan="5" style="text-align:center; color:#10b68d;">No hay productos con bajo stock.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { ProductService } from '@/utils/productServices';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const search = ref('');
const productos = ref([]);
const productService = new ProductService();
const loading = ref(false);

const headers = [
  { title: 'ID', key: 'id', align: 'start', value: 'product_id' },
  { title: 'Imagen', key: 'image', align: 'start', value: 'image', sortable: false },
  { title: 'Nombre', key: 'name', align: 'start', value: 'name' },
  { title: 'Categoría', key: 'categoria_id', align: 'start', value: 'categoria_id' },
  { title: 'Precio', key: 'price', align: 'start', value: 'price' },
  { title: 'Stock', key: 'stock', align: 'start', value: 'stock' },
  { title: 'Stock Mínimo', key: 'stock_min', align: 'start', value: 'stock_min' },
];

async function cargarProductos() {
  loading.value = true;
  try {
    const res = await productService.getProducts();
    productos.value = (res.data || []).map(p => ({
      product_id: p.product_id ?? '',
      image: p.image ?? '',
      name: p.name ?? '',
      categoria_id: p.categoria_id ?? '',
      price: p.price ?? '',
      stock: p.stock ?? '',
      stock_min: p.stock_min ?? '',
      // No agregues 'acciones', es solo para el slot
    }));
  } catch (e) {
    productos.value = [];
    console.error('Error al cargar productos:', e);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  cargarProductos();
});

const generarPDFCompleto = async () => {
  loading.value = true;
  
  try {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text('Reporte de Inventario Completo', 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);
    
    let yPosition = 40;
    
    // Para cada producto, agregar información detallada
    for (const producto of productos.value) {
      // Verificar si hay espacio en la página actual
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Nombre del producto
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Producto: ${producto.name}`, 12, yPosition);
      yPosition += 10;
      
      // ID y Categoría
      doc.setFontSize(10);
      doc.text(`ID: ${producto.product_id} | Categoría: ${producto.categoria_id}`, 14, yPosition);
      yPosition += 7;
      
      // Precio y Stock
      doc.text(`Precio: $${producto.price.toFixed(2)} | Stock: ${producto.stock} | Mínimo: ${producto.stock_min}`, 14, yPosition);
      yPosition += 7;
      
      // Estado
      doc.text(`Estado: ${producto.status ? 'Activo' : 'Inactivo'}`, 14, yPosition);
      yPosition += 10;
      
      // Línea separadora
      doc.line(14, yPosition, 196, yPosition);
      yPosition += 15;
    }
    
    doc.save(`inventario_detallado_${new Date().toISOString().slice(0, 10)}.pdf`);
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    Swal.fire('Error', 'No se pudo generar el PDF', 'error');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Css para el diseño */
.card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    overflow: hidden;
}

.card-header {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    font-size: 1.3rem;
    color: var(--dark);
}

.card-body {
    padding: 20px;
}

/* La tabla */
.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

th {
    background-color: #f8f9fa;
    color: var(--dark);
    font-weight: 600;
}

tr:hover {
    background-color: rgba(67, 97, 238, 0.03);
}

/* Simulacion de para representar la cantidad de producto */
.progress-container {
    background: #e9ecef;
    border-radius: 5px;
    height: 10px;
    margin-top: 8px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    border-radius: 5px;
}

.bg-success {
    background: #4cc9f0;
}

.bg-warning {
    background: #ff9e00;
}

.bg-danger {
    background: #f72585;
}

.contendor_separador{
    width: 100%;
    display: flex;
    gap: 20px;
}

.btn_general{
    background-color: #10b68d;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
}

.btn_general i{
    color: white;
}

/* Estilos para el modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35); /* Más oscuro para mejor contraste */
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #f8fafc; /* Fondo más claro y suave */
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(16,182,141,0.22);
  padding: 36px 28px 28px 28px;
  min-width: 340px;
  max-width: 98vw;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  border: 1.5px solid #10b68d22;
}
.modal-close {
  position: absolute;
  top: 14px;
  right: 22px;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #10b68d;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #018175;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}

.modal-form label {
  font-weight: 600;
  color: #10b68d;
  margin-bottom: 4px;
  margin-top: 2px;
  letter-spacing: 0.5px;
}

.modal-form input,
.modal-form select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.5px solid #e0e7ef;
  background: #fff;
  font-size: 1rem;
  color: #222;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  margin-bottom: 2px;
  box-shadow: 0 1px 2px rgba(16,182,141,0.04);
}

.modal-form input:focus,
.modal-form select:focus {
  border-color: #10b68d;
  box-shadow: 0 0 0 2px #10b68d22;
}

.modal-form button.btn_general {
  margin-top: 12px;
  background: linear-gradient(90deg, #10b68d 60%, #4cc9f0 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(16,182,141,0.10);
}

.modal-form button.btn_general:hover {
  background: linear-gradient(90deg, #018175 60%, #4cc9f0 100%);
}

.modal-form img {
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  border: 1.5px solid #10b68d33;
  box-shadow: 0 2px 8px rgba(16,182,141,0.10);
  background: #fff;
  padding: 4px;
}

/* Paginación */
.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 18px 0 0 0;
}
.paginacion button {
  background: #10b68d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.paginacion button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.image-preview-container {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  width: 100%;
  position: relative; /* Añadido para contener el botón absolutamente posicionado */
  padding: 10px; /* Espacio extra para el botón */
}

.image-preview {
  position: relative;
  width: 80%;
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
.acciones-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.mini-image-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  margin: 0 auto;
}
.mini-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.v-data-table thead,
.v-data-table-header,
.v-data-table-header th {
  display: table-header-group !important;
  visibility: visible !important;
  color: inherit !important;
}
</style>