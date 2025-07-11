import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { enviroment } from '../../config/enviroment.js';
import { User } from "../../models/index.js"

export const setupGoogleAuth = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: enviroment.GOOGLE_CLIENT_ID,
        clientSecret: enviroment.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
        scope: ['profile', 'email'] // Añade email para obtener el correo
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            const [user, created] = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: {
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                rol_id : enviroment.ROLE_DEFAULT
            }
            });
            return done(null, user);
        } catch (error) {
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