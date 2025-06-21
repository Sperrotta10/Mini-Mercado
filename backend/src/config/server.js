import { routerApiV1 } from '../api/v1/router.js';
import passport from 'passport';
import { setupGoogleAuth } from '../middlewares/authGoogle/google.js';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { enviroment } from './enviroment.js';


export function createServer() {

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

    return app;
}