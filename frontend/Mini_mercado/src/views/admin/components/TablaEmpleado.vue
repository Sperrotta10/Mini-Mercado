<template>
    <div class="carta">
        <div class="contenedor_carta">
            <div class="tabla_responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre y Apellido</th>
                            <th>Estado</th>
                            <th>Operación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1001</td>
                            <td>Juan Da</td>
                            <td><span style="color: green;">Activo</span></td>
                            <td class="contendor_separador">
                                <button class="btn_general"><i class="fas fa-edit"></i></button>
                                <button class="btn_general"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>Santiago Ramirez</td>
                            <td><span style="color: green;">Activo</span></td>
                            <td class="contendor_separador">
                                <button class="btn_general"><i class="fas fa-edit"></i></button>
                                <button class="btn_general"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1003</td>
                            <td>Manuel Paimon</td>
                            <td><span style="color: green;">Activo</span></td>
                            <td class="contendor_separador">
                                <button class="btn_general"><i class="fas fa-edit"></i></button>
                                <button class="btn_general"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>1004</td>
                            <td>Jesus Antonio</td>
                            <td><span style="color: orange;">Inactivo 👻</span></td>
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
</template>

<style scoped>
/* Css para el diseño */
.carta {
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

.contenedor_carta {
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
    color: black;
    font-weight: 600;
}

tr:hover {
    background-color: rgba(67, 97, 238, 0.03);
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
</style>