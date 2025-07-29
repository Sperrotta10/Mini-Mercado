import { User, Role, PasswordRecovery } from "../../../../models/index.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { enviroment } from "../../../../config/enviroment.js";
import { sendRecoveryEmail } from "../helper/sendEmail.js";

export class AuthModel {

    static async login(data) {

        try {

            const user = await User.findOne({
                where : {email : data.email},
                include : {
                    model : Role,
                    as : 'role',
                    attributes: ['name']
                }
            });

            if(!user) return {message : "El email no existe", status : 401};

            if(!user.status) return {message : "Usuario inactivo", status : 401};

            const verifyPassword = await bcrypt.compare(data.password, user.password);

            if(!verifyPassword) return {message : "Error al loguearse", status : 401};

            const token = jwt.sign(
                {user_id : user.user_id, email : user.email, rol : user.role.name }, 
                enviroment.JWT_SECRET,
                {expiresIn : '1h'}
            )

            const userReturn = { user_id : user.user_id, username : user.username, email : user.email };
            
            return {message : "Login exitoso", data : userReturn, access_token : token};

        } catch (error) {
            console.error("Error al hacer el login", error.message);
            throw error;
        }
    }

    static async forgotPassword(data) {

        try {

            const userExists = await User.findOne({ where: { email: data.email } });

            if (!userExists) return { message: "El email no existe", status: 404 };
            if (!userExists.status) return { message: "Usuario inactivo", status: 401 };

            const token = crypto.randomUUID();
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

            await PasswordRecovery.create({
                user_id: userExists.user_id,
                token,
                expires_at: expiresAt
            });

            await sendRecoveryEmail(userExists.email, token);

            return { message: "Se ha enviado un email de recuperación", status: 200 };

        } catch (error) {
            console.error("Error al hacer el forgot password", error.message);
            throw error;
        }
    }

    static async resetPassword(data) {

        try {

            const newPassword = data.password;
            const token = data.token;

            const recoveryRecord = await PasswordRecovery.findOne({ where: { token } });

            if (!recoveryRecord) return { message: "Token inválido", status: 400 };
            
            // Verificar si ya fue usado
            if (recoveryRecord.used) return { message: "Este enlace ya fue utilizado", status: 400 };
            

            // Verificar expiración
            if (new Date() > recoveryRecord.expires_at) return { message: "El token ha expirado", status: 400 };
            
            // Cambiar contraseña
            const salt = parseInt(enviroment.SALT, 10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await User.update({ password: hashedPassword }, { where: { user_id: recoveryRecord.user_id } });

            // Marcar el token como usado
            recoveryRecord.used = true;
            await recoveryRecord.save();

            return { message: "Contraseña actualizada exitosamente", status: 200 };

        } catch (error) {
            console.error("Error al hacer resetPassword:", error.message);
            throw error;
        }
    }

}