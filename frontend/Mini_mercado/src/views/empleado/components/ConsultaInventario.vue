<template>
  <div id="inventory" class="page">
    <div class="card">
      <div class="carta_header">
        <h3></h3>
      </div>
      <div class="contendor_carta">
        <div class="tabla_responsive">
          <table>
            <thead>
              <tr>
                <th>Nombre de producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Minimo stock</th>
                <th>Estado de cantidad</th>
                <th>Operación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.minStock }}</td>
                <td>
                  <div class="progress-container">
                    <div 
                      class="progress-bar" 
                      :class="{
                        'bg-success': product.status === 'Bien',
                        'bg-warning': product.status === 'Bajo',
                        'bg-danger': product.status === 'Muy bajo'
                      }" 
                      :style="{
                        width: `${Math.min(100, (product.stock / product.minStock) * 100)}%`
                      }"
                    ></div>
                  </div>
                  <small>{{ product.status }}</small>
                </td>
                <td class="contendor_separador">
                  <button 
                    class="btn_general" 
                    @click="openEditModal(product)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para reducir cantidad -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Reducir cantidad de {{ selectedProduct.name }}</h3>
        
        <div class="modal-body">
          <p>Stock actual: {{ selectedProduct.stock }}</p>
          
          <div class="form-group">
            <label for="reduceAmount">Cantidad a reducir:</label>
            <input 
              type="number" 
              id="reduceAmount" 
              v-model.number="reduceAmount" 
              min="1" 
              :max="selectedProduct.stock"
            >
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn-cancel" @click="showModal = false">
            Cancelar
          </button>
          <button class="btn-confirm" @click="reduceStock">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado para controlar la visibilidad del modal
const showModal = ref(false);
// Producto seleccionado para editar
const selectedProduct = ref(null);
// Cantidad a reducir
const reduceAmount = ref(1);

// Datos de productos (podrían venir de una API)
const products = ref([
  {
    name: 'Manzana',
    category: 'Frutas',
    stock: 156,
    minStock: 50,
    status: 'Bien'
  },
  {
    name: 'Naranja',
    category: 'Frutas',
    stock: 89,
    minStock: 100,
    status: 'Bajo'
  },
  {
    name: 'Doritos',
    category: 'Chucheria',
    stock: 203,
    minStock: 150,
    status: 'Bien'
  },
  {
    name: 'Coca cola',
    category: 'Refresco',
    stock: 32,
    minStock: 100,
    status: 'Muy bajo'
  }
]);

// Abre el modal con el producto seleccionado
const openEditModal = (product) => {
  selectedProduct.value = product;
  reduceAmount.value = 1;
  showModal.value = true;
};

// Reduce el stock del producto seleccionado
const reduceStock = () => {
  if (selectedProduct.value && reduceAmount.value > 0) {
    const productIndex = products.value.findIndex(
      p => p.name === selectedProduct.value.name
    );
    
    if (productIndex !== -1) {
      // No permitir que el stock sea negativo
      const newStock = Math.max(0, products.value[productIndex].stock - reduceAmount.value);
      products.value[productIndex].stock = newStock;
      
      // Actualizar el estado según el nuevo stock
      updateProductStatus(productIndex);
      
      // Cerrar el modal
      showModal.value = false;
    }
  }
};

// Actualiza el estado del producto basado en el stock
const updateProductStatus = (index) => {
  const product = products.value[index];
  const percentage = (product.stock / product.minStock) * 100;
  
  if (percentage >= 70) {
    product.status = 'Bien';
  } else if (percentage >= 30) {
    product.status = 'Bajo';
  } else {
    product.status = 'Muy bajo';
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

.carta_header {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carta_header h3 {
    font-size: 1.3rem;
    color: var(--dark);
}

.contendor_carta {
    padding: 20px;
}

/* La tabla */
.tabla_responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
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

.contendor_separador {
    width: 100%;
    display: flex;
    gap: 20px;
}

.btn_general {
    background-color: #10b68d;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
}

.btn_general i {
    color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-body {
  margin: 20px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #10b68d;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style>