import bcrypt from 'bcrypt';
import { User, Role } from "../../../../models/index.js"
import { enviroment } from "../../../../config/enviroment.js"

export class ModelUserRegister {

    // Metodo para crear un usuario
    static async create(data, role_id) {

        try {

            const exist = await User.findOne({where : {email : data.email}});

            if(exist) return {message : "User ya existe", status : 409};

            const salt = parseInt(enviroment.SALT, 10);
            const hashPassword = await bcrypt.hash(data.password, salt);

            const user = await User.create({...data, password : hashPassword, rol_id : role_id});

            const userResponse = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                suscripcion : user.suscripcion,
                updatedAt : user.updatedAt,
                createdAt : user.createdAt,
            }

            return {message : "User creado", status : 201, data : userResponse};


        } catch (error) {
            console.error("Error al crear usuario");
            throw error;
        }
    }

    // Metodo para obtener todos los usuarios
    static async getAll() {

        try {
            
            const users = await User.findAll({
                attributes: { exclude: ['password'] } 
            });

            if(!users) return {message : "Users no encontrados", status : 404};

            return {message : "Users obtenidos", data : users, status : 200};

        } catch (error) {
            console.error("Error al obtener los usuarios");
            throw error;
        }
    }

    // Metodo para obtener un usuario por su id
    static async getId(user_id) {

        try {
            
            const user = await User.findByPk(user_id, {
                attributes: { exclude: ['password'] }  
            });

            if(!user) return {message : "User no encontrado", status : 404};

            return {message : "User obtenido", status: 200, data : user};

        } catch (error) {
            console.error("Error al obtener user");
            throw error;
        }
    }

    // Metodo para obtener un usuario por su id
    static async getCedula(cedula) {

        try {
            
            const user = await User.findOne( { where : { cedula }, 
                attributes: { exclude: ['password'] }  
            });

            if(!user) return {message : "User no encontrados", status : 404};

            return {message : "User obtenido", status: 200, data : user};

        } catch (error) {
            console.error("Error al obtener user");
            throw error;
        }
    }

    static async getPaginationEmpleado(page, limit, offset, role) {
        
        try {

            const { count, rows: users } = await User.findAndCountAll({
                include: {
                    model: Role,
                    as: 'role',
                    where: { name: role },
                },
                limit,
                offset,
                attributes: { exclude: ['password'] } 
            });

            if (users.length === 0) return { message: "No se encontraron usuarios con ese rol", status: 404 };

            return { 
                message: 'Users obtenidos', 
                status: 200, 
                data: {
                    currentPage : page,
                    totalPages: Math.ceil(count / limit),
                    totalItems: count,
                    users
                }
            };

        } catch (error) {
            console.error("Error al obtener los usuarios");
            throw error;
        }
    }

    // metodo para actualizar un usuario
    static async update(user_id, data) {
        
        try {

            const exist = await User.findByPk(user_id);

            if(!exist) return {message : "User no encontrado", status : 404};

            await User.update(data, {where : { user_id }});

            return {message : "User modificado", status : 200};
            

        } catch (error) {
            console.error("Error al modificar user");
            throw error;
        }
    }

    // metodo para eliminar un usuario
    static async delete(user_id) {
        
        try {

            const exist = await User.findByPk(user_id);

            if(!exist) return {message : "User no encontrado", status : 404};
            
            await User.destroy({where : { user_id }});

            return {message : "User eliminado", status : 200};

        } catch (error) {
            console.error("Error al eliminar user");
            throw error;
        }
    }
}