<template>
    <div id="inventory" class="page">
      <div class="card">
          <div class="card-header">
              <h3></h3>
          </div>
          <div class="card-body">
              <div class="table-responsive">
                  <table>
                      <thead>
                          <tr>
                              <th>Nombre de producto</th>
                              <th>Categoría</th>
                              <th>Stock</th>
                              <th>Minimo stock</th>
                              <th>Estado de cantida</th>
                              <th>Operación</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Manzana</td>
                              <td>Frutas</td>
                              <td>156</td>
                              <td>50</td>
                              <td>
                                  <div class="progress-container">
                                      <div class="progress-bar bg-success" style="width: 78%"></div>
                                  </div>
                                  <small>Bien</small>
                              </td>
                              <td class="contendor_separador">
                                  <button class="btn_general"><i class="fas fa-edit"></i></button>
                                  <button class="btn_general"><i class="fas fa-trash"></i></button>
                              </td>
                          </tr>
                          <tr>
                              <td>Naranja</td>
                              <td>Frutas</td>
                              <td>89</td>
                              <td>100</td>
                              <td>
                                  <div class="progress-container">
                                      <div class="progress-bar bg-warning" style="width: 45%"></div>
                                  </div>
                                  <small>Bajo</small>
                              </td>
                              <td class="contendor_separador">
                                  <button class="btn_general"><i class="fas fa-edit"></i></button>
                                  <button class="btn_general"><i class="fas fa-trash"></i></button>
                              </td>
                          </tr>
                          <tr>
                              <td>Doritos</td>
                              <td>Chucheria</td>
                              <td>203</td>
                              <td>150</td>
                              <td>
                                  <div class="progress-container">
                                      <div class="progress-bar bg-success" style="width: 85%"></div>
                                  </div>
                                  <small>Bien</small>
                              </td>
                              <td class="contendor_separador">
                                  <button class="btn_general"><i class="fas fa-edit"></i></button>
                                  <button class="btn_general"><i class="fas fa-trash"></i></button>
                              </td>
                          </tr>
                          <tr>
                              <td>Coca cola</td>
                              <td>Refresco</td>
                              <td>32</td>
                              <td>100</td>
                              <td>
                                  <div class="progress-container">
                                      <div class="progress-bar bg-danger" style="width: 16%"></div>
                                  </div>
                                  <small>Muy bajo</small>
                              </td>
                              <td class="contendor_separador">
                                  <button class="btn_general"><i class="fas fa-edit"></i></button>
                                  <button class="btn_general"><i class="fas fa-trash"></i></button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>

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
</style>