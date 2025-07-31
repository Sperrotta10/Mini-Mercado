import { Router } from "express";
import { registerRouter } from "../../modules/user/register/router/register.js";
import { authRouter } from "../../modules/user/auth/router/auth.js";
import { roleRouter } from "../../modules/role/router/role.js";
import { categoriaRouter } from "../../modules/category/router/category.js";
import { productRouter } from "../../modules/product/router/product.js";
import { cartRouter } from "../../modules/cart/router/cart.js"
import { cartItemRouter } from "../../modules/cart-item/router/cart_item.js";
import { publicityRouter } from "../../modules/publicity/router/publicity.js";

import { updateSubscriptionStatus } from "../../middlewares/user_register/suscriptionCheck.js";
import { authenticateHybrid } from "../../middlewares/auth/authentificate.js";
import { authorizeRoles } from "../../middlewares/auth/authRole.js";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../docs/swagger.json' assert { type: 'json' };

export const routerApiV1 = Router();

// Definimos las rutas de la API v1
routerApiV1.use("/register", registerRouter);
routerApiV1.use("/auth", authRouter);
routerApiV1.use("/cart", authenticateHybrid, authorizeRoles('cliente'), updateSubscriptionStatus, cartRouter);
routerApiV1.use("/cart-item", authenticateHybrid, authorizeRoles('cliente'), updateSubscriptionStatus, cartItemRouter);
routerApiV1.use("/category", categoriaRouter);
routerApiV1.use("/product", productRouter);
routerApiV1.use("/publicity", publicityRouter);
routerApiV1.use("/role", roleRouter);
routerApiV1.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// prueba de productos
routerApiV1.get('/test-products', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Productos</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
        }

        h1 {
          text-align: center;
          color: #343a40;
        }

        #productos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          text-align: center;
        }

        .card img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .card h3 {
          margin: 10px 0 5px;
        }

        .card p {
          color: #555;
        }
      </style>
    </head>
    <body>
      <h1>Productos</h1>
      <div id="productos"></div>

      <script>
        fetch('http://localhost:3000/api/v1/product/')
          .then(res => res.json())
          .then(data => {
            const contenedor = document.getElementById('productos');
            data.data.forEach(p => {
              const div = document.createElement('div');
              div.className = 'card';
              div.innerHTML = \`
                <img src="\${p.image}" alt="\${p.name}" />
                <h3>\${p.name}</h3>
                <p>Precio: \$\${p.price}</p>
              \`;
              contenedor.appendChild(div);
            });
          })
          .catch(err => console.error('Error:', err));
      </script>
    </body>
    </html>
  `);
});