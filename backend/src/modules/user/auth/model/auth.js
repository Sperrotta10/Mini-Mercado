import { User, Role } from "../../../../models/index.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { enviroment } from "../../../../config/enviroment.js";

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
}