import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { enviroment } from './config/enviroment.js';
import { sequelize } from './config/dataBase.js';
import './models/index.js';
import { routerApiV1 } from './api/v1/router.js';
import passport from 'passport';
import { setupGoogleAuth } from './middlewares/authGoogle/google.js';
import session from 'express-session';


const app = express();

// middleware que permite el acceso a la API desde el frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

// middleware para parsear el cuerpo de las peticiones y las cookies
app.use(express.json());
app.use(cookieParser());

// Configuración de sesión (¡antes que passport!)
app.use(session({
  secret: enviroment.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: enviroment.SECURE_COOKIE === "prod" } 
}));

// Inicializa Passport y configura estrategias
app.use(passport.initialize());
app.use(passport.session());
setupGoogleAuth(passport); // Configura la estrategia Google

app.use('/api/v1/', routerApiV1);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the backend server!' });
});

const PORT = enviroment.PORT;

// funcion para crear las tablas de la base de datos si no existen
async function createTables() {
    
    try {
        
        await sequelize.sync({ alter: true });
        console.log("============================================");
        console.log('✅ Tables created successfully.');

    } catch (error) {
        console.error('❌ Error creating tables:', error);
    }
}

// fuuncion para conectar a la base de datos
async function connectToDatabase() {
    try {

        await sequelize.authenticate();
        if(enviroment.SECURE_DB === 'development') await createTables();

        console.log('✅ Database connection established successfully.');

    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

// funcion para iniciar el servidor
function connectServer() {
    
    try {
        
        app.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
            console.log("============================================");
        })

    } catch (error) {
        console.log(`❌ Server failed to start: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}

// Main function to start the application
async function startApp() {

    console.log('🔄 Starting application...');
    try {
     
        await connectToDatabase();
        connectServer();

    } catch (error) {
        console.error('❌ Error during application startup:', error);
        process.exit(1);
    }
}

startApp();