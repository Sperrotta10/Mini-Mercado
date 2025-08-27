import { routerApiV1 } from '../api/v1/router.js';
import passport from 'passport';
import { setupGoogleAuth } from '../middlewares/authGoogle/google.js';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload"
import { enviroment } from './enviroment.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export function createServer() {

    const app = express();

    // middleware que permite el acceso a la API desde el frontend
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }))

    // middleware para parsear el cuerpo de las peticiones y las cookies
    app.use(express.json());
    app.use(cookieParser(enviroment.COOKIE_SECRET));

    // Servir los archivos estáticos
    app.use(express.static(path.join(__dirname, '../public')));
    
    // Middleware para parsear datos tipo form-urlencoded
    app.use(express.urlencoded({ extended: true }));
    // Middleware para manejar archivos
    app.use(fileUpload({
        useTempFiles: false,
        createParentPath: true, // Crea directorios padre si no existen
        limits: { fileSize: 2 * 1024 * 1024 } // Limita el tamaño del archivo a 2MB
    }));

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

    // Endpoints para mostrar HTMLs directamente
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'login.html'));
    });

    app.get('/forgot-password', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'forgot-password.html'));
    });

    app.get('/reset-password', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'reset-password.html'));
    });

    return app;
}