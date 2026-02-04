# Backend Mini-Mercado

Guía completa y detallada para instalar, ejecutar y entender el backend del proyecto Mini-Mercado.

## Descripción General

- **Stack:** Node.js (Express), Sequelize (MySQL), Passport (Google OAuth), JWT, Zod, Swagger.
- **Arquitectura:** Modular por dominio con separación `router/`, `controller/`, `model/`, `schemas/`, `validation/` por módulo.
- **Persistencia:** MySQL con ORM Sequelize; migraciones y seeders vía `sequelize-cli`.
- **Autenticación:** 
  - JWT almacenado en cookie firmada `access_token`.
  - Sesión con Passport + Google OAuth 2.0.
- **Características adicionales:** Rate limiting, subida de archivos, HTML estático para login/recuperación.

Rutas base de API: `http://localhost:3000/api/v1/`.

Swagger: `http://localhost:3000/api/v1/api-docs`.

---

## Requisitos

- Node.js 20+
- Docker y Docker Compose (opcional pero recomendado)
- MySQL 8 (si corres sin Docker)

---

## Variables de Entorno

El backend usa las variables definidas en `src/config/enviroment.js`. Crea un archivo `.env` en `backend/` con:

```env
# Servidor
PORT=3000
COOKIE_SECRET=your-cookie-secret
SESSION_SECRET=your-session-secret
SECURE_COOKIE=dev # usa "prod"/"production"/"true" para cookies seguras en producción
COOKIE_SAMESITE=lax # "none" si frontend/backend están en dominios distintos
COOKIE_DOMAIN= # opcional

# Base de datos
DB_NAME=mini_mercado
DB_HOST=db # "localhost" si no usas Docker
DB_USER=mini_user
DB_PORT=3306
DB_PASSWORD=mini_password
DB_ROOT_PASSWORD=mini_root_password
SECURE_DB=development
DB_SSL=false
DB_SSL_CA= # PEM multilínea o base64 (útil para Aiven)

# JWT
JWT_SECRET=your-jwt-secret

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxx

# Supabase (si almacenas imágenes allí)
SUPABASE_URL=...
SUPABASE_KEY=...

# Frontend permitido por CORS
FRONTEND_URL=http://localhost:5173

# URL pública del backend (requerido para Google OAuth en deploy)
BACKEND_URL=http://localhost:3000
GOOGLE_SUCCESS_REDIRECT=
GOOGLE_FAILURE_REDIRECT=

# SMTP (recuperación de contraseña)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=pass
SMTP_SECURE=false
```

Guía de deploy Render + Aiven (MySQL): `docs/deploy-render-aiven.md`.

- `src/config/config.cjs` se usa por `sequelize-cli` y toma `DB_*` de `.env` para las migraciones.
- `src/config/enviroment.js` carga el `.env` para la ejecución del servidor.

---

## Puesta en Marcha (Docker)

1) Clonar y moverse al backend

```bash
git clone https://gitlab.com/universidad8054523/mini-mercado
cd mini-mercado/backend
```

2) Crear `.env` como se indica arriba.

3) Levantar servicios

```bash
docker-compose up --build
```

- Servicio `backend` escuchará en `http://localhost:3000`.
- Servicio `db` (MySQL 8) expondrá `3307` en el host y `3306` en el contenedor.
- El backend espera a MySQL antes de iniciar (`entrypoint` en `docker-compose.yaml`).

4) Ejecutar migraciones y seeders dentro del contenedor

```bash
docker exec -it backend-backend-1 npx sequelize-cli db:migrate
docker exec -it backend-backend-1 npx sequelize-cli db:seed:all
```

5) Ver documentación Swagger

- `http://localhost:3000/api/v1/api-docs`

---

## Puesta en Marcha (Sin Docker)

Asegúrate de tener MySQL corriendo localmente y `.env` ajustado (por ejemplo `DB_HOST=localhost`).

```bash
cd backend
npm install
npm run dev      # nodemon en desarrollo
# ó
npm start        # node en producción
```

Migraciones y seeds:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Para deshacer:

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```

Generar nueva migración:

```bash
npx sequelize-cli migration:generate --name modify-fk-carts-user-cascade
```

---

## Scripts Disponibles

Definidos en `package.json`:

- `dev`: arranca el servidor con `nodemon`.
- `start`: arranca el servidor con `node`.
- `test`: ejecuta pruebas con `vitest`.
- `db:migrate`: aplica migraciones.
- `db:migrate:undo`: deshace la última migración.
- `db:seed`: aplica todos los seeders.
- `db:seed:undo`: deshace todos los seeders.

```bash
npm run dev
npm run start
npm run db:migrate
npm run db:migrate:undo
npm run db:seed
npm run db:seed:undo
```

---

## Arquitectura y Flujo

### Arranque

- `src/app.js`:
  - Carga entorno (`enviroment`).
  - Autentica conexión a la base (`sequelize.authenticate()`).
  - Importa modelos y relaciones (`src/models/index.js`).
  - Crea el servidor Express (`createServer()`) y escucha en `PORT`.

- `src/config/server.js` configura el servidor Express:
  - CORS hacia `http://localhost:5173` con credenciales.
  - `express.json` y `cookie-parser` con `COOKIE_SECRET`.
  - Estáticos: sirve `src/public/` (login/forgot/reset).
  - `express.urlencoded` y `express-fileupload` para formularios y archivos.
  - Sesiones vía `express-session` con `SESSION_SECRET` y `SECURE_COOKIE`.
  - Inicializa Passport y estrategia Google (`middlewares/authGoogle/google.js`).
  - Monta rutas en `/api/v1/` (`src/api/v1/router.js`).

### Ruteo Principal

`src/api/v1/router.js` monta routers por dominio:

- `/register` (usuarios, alta/baja/consulta)
- `/auth` (login, recuperación, OAuth)
- `/role` (roles)
- `/category` (categorías)
- `/product` (productos)
- `/publicity` (publicidad)
- `/cart` y `/cart-item` (carritos y sus ítems)
- `/api-docs` (Swagger UI)

Para `/cart` y `/cart-item` se aplica:
- `authenticateHybrid`: admite JWT en cookie firmada o sesión Passport.
- `authorizeRoles('cliente')`: acceso restringido a clientes.
- `updateSubscriptionStatus`: sincroniza estado de suscripción y activa/desactiva carritos según plan.

### Módulos por Dominio

Cada módulo bajo `src/modules/<dominio>/` posee:

- `router/`: define endpoints.
- `controller/`: lógica de negocio.
- `model/`: acceso a datos si hay repositorios específicos.
- `schemas/`: definición de modelos Sequelize y/o validaciones (Zod).
- `validation/`: validaciones de entradas específicas.

Relaciones de datos en `src/models/index.js`:

- `User` ↔ `Role` (N:1)
- `User` ↔ `Cart` (1:N, cascade)
- `Cart` ↔ `CartItem` (1:N, cascade)
- `Product` ↔ `CartItem` (1:1)
- `Product` ↔ `Category` (N:1)
- `User` ↔ `PasswordRecovery` (1:N, cascade)

### Base de Datos

- Conexión en `src/config/dataBase.js` usando variables del entorno.
- `sequelize-cli` toma configuración desde `src/config/config.cjs`.
- Migraciones en `backend/migrations/` y seeders en `backend/seeders/`.
- Ejemplos de migraciones y seeds ya incluidos (roles, categorías, etc.).

### Autenticación

- **JWT** (`middlewares/auth/authentificate.js`):
  - Lee cookie firmada `access_token` y verifica con `JWT_SECRET`.
  - Si válido, inyecta `req.user` y permite el acceso.

- **Passport (Google OAuth)**:
  - Configurado en `middlewares/authGoogle/google.js`.
  - Usa sesiones de `express-session`.
  - Si autenticado, normaliza `req.user` para el resto del sistema.

- **Autorización por rol** (`middlewares/auth/authRole.js`):
  - Verifica rol del usuario (`rol`/`rol_id`) y compara con los permitidos.

### Suscripción y Carritos

- `middlewares/user_register/suscriptionCheck.js`:
  - Verifica expiración de suscripción.
  - Si expiró, marca al usuario como `free` y actualiza carritos.

- `utils/updateCartSuscription.js`:
  - Plan `free`: máximo 3 carritos activos.
  - Plan `premium`: máximo 15 carritos activos.
  - Activa/desactiva carritos según límite.

### Documentación de API

- `src/docs/swagger.json` describe endpoints principales:
  - `Register`, `roles`, `category`, `auth`, `product`.
- Accede vía Swagger UI en `/api/v1/api-docs`.

---

## Manejo de Archivos y HTML

- `express-fileupload` habilitado con tamaño máximo de 2MB.
- HTML estáticos en `src/public/`: `login.html`, `forgot-password.html`, `reset-password.html`.
- Endpoints para servirlos: `/login`, `/forgot-password`, `/reset-password`.

---

## Rate Limiting

- El proyecto usa `express-rate-limit` y factorías en `src/middlewares/rate_limiters/` (por recurso).
- Útil para proteger endpoints sensibles (auth, carrito, etc.).

---

## Comandos Útiles

Seeder CLI:

```bash
npx sequelize-cli seed:generate --name seed-<name>
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```

Migraciones:

```bash
npx sequelize-cli migration:generate --name <nombre>
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo:all
```

Dentro del contenedor:

```bash
docker exec -it backend-backend-1 npx sequelize-cli db:migrate
docker exec -it backend-backend-1 npx sequelize-cli db:seed:all
```

---

## Solución de Problemas

- **El backend no arranca:** verifica `.env` y que MySQL esté accesible (`db` en Docker o `localhost` sin Docker).
- **Error de JWT inválido:** revisa que `COOKIE_SECRET` firme cookies y `JWT_SECRET` coincida entre generación y validación.
- **403 No autorizado:** el rol del usuario no coincide con los requeridos del endpoint.
- **Uploads fallan (413):** el archivo supera 2MB o faltan rutas/permiso en el contenedor.
- **Swagger no muestra endpoints:** asegúrate que `src/docs/swagger.json` exista y sea válido.

---

## Notas de Producción

- Ajusta `SECURE_COOKIE=prod` para enviar cookies `secure`.
- Usa variables seguras y secretos en el entorno del servidor.
- Configura CORS con el dominio real del frontend.
- Ejecuta `npm start` en el contenedor (Dockerfile ya expone `3000`).

---

## Licencia

MIT.
