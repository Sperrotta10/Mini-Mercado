import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { enviroment } from '../../config/enviroment.js';
import { User } from "../../models/index.js"

function joinUrl(base, path) {
    const baseClean = String(base || '').replace(/\/$/, '');
    const pathClean = String(path || '').startsWith('/') ? path : `/${path}`;
    return `${baseClean}${pathClean}`;
}

export const setupGoogleAuth = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: enviroment.GOOGLE_CLIENT_ID,
        clientSecret: enviroment.GOOGLE_CLIENT_SECRET,
        callbackURL: joinUrl(enviroment.BACKEND_URL || 'http://localhost:3000', '/api/v1/auth/google/callback'),
        scope: ['profile', 'email'] // Añade email para obtener el correo
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Busca si ya existe un usuario con el googleId
                let user = await User.findOne({ where: { googleId: profile.id } });
                
                if (!user) {
                    // No existe usuario con googleId, buscamos por email
                    user = await User.findOne({ where: { email: profile.emails[0].value } });

                    if (user) {
                        // Existe usuario con email, actualizamos googleId
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        // No existe usuario con googleId ni email, creamos uno nuevo
                        user = await User.create({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            username: profile.displayName,
                            rol_id: enviroment.ROLE_DEFAULT
                        });
                    }
                }

                return done(null, user);

            } catch (error) {
                console.error("Error al autenticar con Google:", error);
                return done(error, null);
            }
        }

    ));

    passport.serializeUser((user, done) => {
        done(null, user.user_id); // Guarda solo el ID en la sesión
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id); // Recupera el usuario completo desde DB
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};