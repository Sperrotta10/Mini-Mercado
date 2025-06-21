import { enviroment } from './config/enviroment.js';
import { sequelize } from './config/dataBase.js';
import { createServer } from './config/server.js';
import './models/index.js';


async function startApp() {

  const app = createServer();
  const PORT = enviroment.PORT;

  try {
    
    await sequelize.authenticate();
    if (enviroment.SECURE_DB === 'development') {
      await sequelize.sync({ alter: true });
      console.log("================================================");
      console.log("✅ Tables created successfully.");
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log("================================================");
    });

  } catch (error) {
    console.error("❌ Failed to start:", error);
    process.exit(1);
  }
}

startApp();