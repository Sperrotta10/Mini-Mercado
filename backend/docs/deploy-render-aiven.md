# Deploy rápido: Render (Backend) + Aiven (MySQL)

Este documento describe el deploy más simple del backend usando:
- **Render**: hosting del servidor Node/Express.
- **Aiven**: MySQL administrado.
- **Supabase**: únicamente **Storage buckets** (imágenes).

---

## 1) Crear MySQL en Aiven

1. En Aiven, crea un servicio **MySQL**.
2. En la pestaña de conexión, copia:
   - `host`
   - `port`
   - `user`
   - `password`
   - `database`
3. Descarga el **CA Certificate** (Aiven suele requerir TLS/SSL para conexiones externas).

---

## 2) Configurar variables de entorno en Render

En Render (Backend → Environment), agrega estas variables.

### Variables mínimas del servidor

- `PORT` (Render la define automáticamente; puedes no setearla)
- `JWT_SECRET`
- `COOKIE_SECRET`
- `SESSION_SECRET`

### CORS + Cookies (IMPORTANTE para SPA)

- `FRONTEND_URL` = URL de tu frontend desplegado (ej: `https://tu-frontend.onrender.com`)
- `SECURE_COOKIE` = `prod`
- `COOKIE_SAMESITE`:
  - Si frontend y backend están en **dominios distintos**: usa `none`
  - Si están en el **mismo dominio**: puedes usar `lax` o `strict`
- `COOKIE_DOMAIN` (opcional): si quieres fijar dominio de cookie.

> Nota: si `COOKIE_SAMESITE=none` el navegador exige `Secure=true`. El backend fuerza esto automáticamente.

### Aiven MySQL

- `DB_NAME`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`

TLS/SSL (para Aiven):
- `DB_SSL` = `true`
- `DB_SSL_CA` = CA cert

**Cómo poner `DB_SSL_CA` en Render:**
- Pega el contenido del certificado tal cual en PEM (multilínea), incluyendo:
  - `-----BEGIN CERTIFICATE-----`
  - `-----END CERTIFICATE-----`

Alternativa:
- Puedes poner `DB_SSL_CA` en base64 (sin saltos). El backend lo decodifica automáticamente cuando no detecta el bloque `BEGIN CERTIFICATE`.

### Supabase (solo imágenes)

- `SUPABASE_URL`
- `SUPABASE_KEY`

### Google OAuth (si lo usas)

- `BACKEND_URL` = URL pública del backend en Render (ej: `https://tu-backend.onrender.com`)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_SUCCESS_REDIRECT` (opcional) = a dónde volver luego del login Google (ej: `https://tu-frontend.onrender.com`)
- `GOOGLE_FAILURE_REDIRECT` (opcional)

### SMTP (solo si usas reset password)

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE`

---

## 3) Crear el servicio en Render

1. Render → New → **Web Service**.
2. Selecciona el repo y el directorio `backend`.
3. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

> El proyecto también tiene `npm run dev`, pero en Render debes usar `start`.

---

## 4) Migraciones y seeders

Como tu base estará vacía en Aiven, necesitas crear tablas y datos iniciales.

Opciones prácticas:

### Opción A (recomendada): correr migraciones localmente apuntando a Aiven

1. En tu PC, crea/ajusta un `.env` en `backend/` con las credenciales de Aiven.
2. Ejecuta:

```bash
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Esto funciona porque `sequelize-cli` lee `src/config/config.cjs`, que ya soporta `DB_SSL`/`DB_SSL_CA`.

#### Nota importante: `DB_SSL_CA` en Windows

En Render es normal pegar el CA en PEM multilínea. En tu PC a veces es más cómodo usar base64.

En PowerShell, si tienes el CA en un archivo `ca.pem`:

```powershell
$caB64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes(".\ca.pem"))
$caB64
```

Luego en tu `.env` local:

```env
DB_SSL=true
DB_SSL_CA=<pega-el-base64-aqui>
```

El backend detecta si es PEM (contiene `BEGIN CERTIFICATE`) o base64 y lo procesa.

### Opción B: Shell en Render

Si habilitas un shell en Render, puedes correr:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

#### Verificación rápida

Si quieres confirmar que todo quedó aplicado:

```bash
npx sequelize-cli db:migrate:status
```

Y si algo salió mal y necesitas revertir (cuidado: borra cambios de migraciones):

```bash
npx sequelize-cli db:migrate:undo:all
```

---

## 5) Checklist final

- Backend responde: `GET /` → mensaje de bienvenida.
- Swagger: `/api/v1/api-docs`.
- CORS: el frontend puede hacer requests con credenciales (`credentials: true`).
- Login: setea cookie `access_token`.
- Aiven: conexión estable (sin errores TLS).
- Supabase: buckets existen y son públicos si las imágenes se consumen por URL pública.

---

## Problemas típicos

- **No se guardan cookies en el navegador**
  - Asegura `COOKIE_SAMESITE=none` y `SECURE_COOKIE=prod` (para dominios distintos).
  - En el frontend, usa `credentials: 'include'` en `fetch`/axios.

- **Error TLS/SSL con Aiven**
  - Asegura `DB_SSL=true` y `DB_SSL_CA` correcto.
  - Si pegaste base64, que no tenga espacios ni saltos.

- **Google OAuth redirige a localhost**
  - Asegura `BACKEND_URL` y (opcional) `GOOGLE_SUCCESS_REDIRECT`.
