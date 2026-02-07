import { enviroment } from './config/enviroment.js';
import { sequelize } from './config/dataBase.js';
import { createServer } from './config/server.js';
//import { seedRoles } from './seeders/auto-seeding/seed-roles.js';
//import { seedCategories } from './seeders/auto-seeding/seed-categorias.js';
import './models/index.js';


function parseBoolean(value) {
  if (value === undefined || value === null) return false;
  return ['1', 'true', 'yes', 'on', 'prod', 'production'].includes(String(value).toLowerCase());
}

function ms(start) {
  return `${Date.now() - start}ms`;
}

function safe(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function normalizeBaseUrl(url) {
  const raw = String(url || '').trim();
  return raw ? raw.replace(/\/+$/, '') : '';
}

function logBanner(effectivePort) {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const secureCookie = parseBoolean(enviroment.SECURE_COOKIE);
  const sameSite = (enviroment.COOKIE_SAMESITE || 'lax').toLowerCase();
  const sslDb = parseBoolean(enviroment.DB_SSL);

  console.log('================================================');
  console.log('🛒 MSJ Market API');
  console.log(`⏱️  Boot: ${new Date().toISOString()}`);
  console.log(`🧩 Node: ${process.version} | Env: ${nodeEnv}`);
  console.log(`🌐 Port: ${effectivePort}`);
  if (enviroment.BACKEND_URL) console.log(`🌍 Public URL: ${normalizeBaseUrl(enviroment.BACKEND_URL)}`);
  console.log(`🔒 Cookies: secure=${secureCookie} sameSite=${sameSite} domain=${safe(enviroment.COOKIE_DOMAIN)}`);
  console.log(`🧭 CORS origin: ${safe(enviroment.FRONTEND_URL, 'http://localhost:5173')}`);
  console.log(`🗄️  DB: host=${safe(enviroment.DB_HOST)} port=${safe(enviroment.DB_PORT)} name=${safe(enviroment.DB_NAME)} ssl=${sslDb}`);
  console.log('================================================');
}

process.on('unhandledRejection', (reason) => {
  console.error('❌ UnhandledRejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UncaughtException:', err);
  process.exit(1);
});


async function startApp() {

  // Log the environment configuration
  const PORT = Number(enviroment.PORT) || 3000;
  logBanner(PORT);
  const app = createServer();
  const bootStart = Date.now();
  let server;

  try {
    
    // Initialize database connection
    const dbStart = Date.now();
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log(`✅ Base de datos conectada (${ms(dbStart)})`);
    
    /*
    if (enviroment.SECURE_DB === 'development') {
      await sequelize.sync({ force: true });
      console.log("================================================");
      console.log("✅ Tables created successfully.");
    }
    */

    /*
    // Seed initial data
    await seedRoles();
    await seedCategories();
    */

    // Start the server
    console.log('🚀 Iniciando servidor HTTP...');
    server = app.listen(PORT, () => {
      const publicBase = normalizeBaseUrl(enviroment.BACKEND_URL);
      const localBase = `http://localhost:${PORT}`;
      const base = publicBase || localBase;
      console.log(`✅ Server listo (${ms(bootStart)})`);
      console.log(`🏠 Root: ${base}/`);
      console.log(`🩺 Health: ${base}/health`);
      console.log(`📚 Swagger: ${base}/api/v1/api-docs`);
      console.log('================================================');
    });

    const shutdown = async (signal) => {
      console.log(`\n🛑 Recibido ${signal}. Cerrando...`);
      try {
        if (server) {
          await new Promise((resolve) => server.close(resolve));
          console.log('✅ HTTP server cerrado');
        }
        await sequelize.close();
        console.log('✅ Conexión DB cerrada');
      } catch (err) {
        console.error('❌ Error durante el shutdown:', err);
      } finally {
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error("❌ Failed to start:", error);
    process.exit(1);
  }
}

startApp();