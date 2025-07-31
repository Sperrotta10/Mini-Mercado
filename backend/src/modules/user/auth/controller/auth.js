import { validateLoginData } from "../validation/login.js"
import { validateEmail } from "../validation/email.js";
import { validateResetPasswordData } from "../validation/reset_password.js";
import { AuthModel } from '../model/auth.js';
import { enviroment } from '../../../../config/enviroment.js';
import jwt from 'jsonwebtoken';

export class AuthController {

    static async login(req,res) {

        const result = validateLoginData(req.body);

        if(!result.success) return res.status(422).json({message : "Error de validacion", error : result.error.errors});

        try {

            const login = await AuthModel.login(result.data);

            if(login.status) return res.status(login.status).json({message : login.message});

            res.cookie('access_token', login.access_token, {
                httpOnly : true, // la cookie solo se puede acceder en el servidor
                secure : enviroment.SECURE_COOKIE === 'production', // la cookie solo se puede acceder en https
                maxAge : 1000 * 60 * 60, // duracion de una hora
                sameSite: 'strict', // la cookie solo se envia al mismo sitio
                signed: true // la cookie esta firmada
            });

            return res.status(200).json({message : login.message, data : login.data});
            
        } catch (error) {

            return res.status(500).json({message : "Error interno del servidor", error : error.message});
        }
    }

    static async forgotPassword(req, res) {
        
        const result = validateEmail(req.body);

        if(!result.success) return res.status(422).json({message : "Error de validacion", error : result.error.errors});

        try {

            const forgotPassword = await AuthModel.forgotPassword(result.data);

            if(forgotPassword.status) return res.status(forgotPassword.status).json({message : forgotPassword.message});

            return res.status(200).json({message : forgotPassword.message, data : forgotPassword.data});

        } catch (error) {

            return res.status(500).json({message : "Error interno del servidor", error : error.message});
        }
    }

    static async resetPassword(req, res) {

        const result = validateResetPasswordData(req.body);

        if(!result.success) return res.status(422).json({message : "Error de validacion", error : result.error.errors});

        try {

            const resetPassword = await AuthModel.resetPassword(result.data);

            if(resetPassword.status) return res.status(resetPassword.status).json({message : resetPassword.message});

            return res.status(200).json({message : resetPassword.message, data : resetPassword.data});

        } catch (error) {

            return res.status(500).json({message : "Error interno del servidor", error : error.message});
        }
    }

    static async logout(req, res) {

        try {

            res.clearCookie('access_token', { 
                httpOnly: true, 
                secure: enviroment.SECURE_COOKIE === 'production',
                sameSite: 'strict' 
            });

            return res.status(200).json({message: "Logout exitoso"});

        } catch (error) {

            return res.status(500).json({message: "Error interno del servidor", error: error.message});
        }
    }

    static async googleLogout(req, res) {

        try {

            req.logout(err => {
                if (err) return res.status(500).json({ message: "Error al cerrar sesión" });

                req.session.destroy(); // Destruye la sesión completamente
                res.clearCookie('connect.sid'); // Limpia la cookie si estás usando express-session
                return res.status(200).json({ message: "Sesión cerrada exitosamente" });
            });   

        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error: error.message });
        }
    }

    static async auth_me(req, res) {

        const user = req.user;
        if (!user) return res.status(401).json({ message: "Usuario no autenticado" });

        try {
            const userExists = await AuthModel.auth_me(user);

            if (userExists.status !== 200) return res.status(404).json({ message: "Usuario no encontrado" });

            return res.status(userExists.status).json({ message: userExists.message, data: userExists.data });

        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error: error.message });

        }
    }
}