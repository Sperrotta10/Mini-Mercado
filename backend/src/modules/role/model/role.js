import { Role } from "../../../models/index.js";

export class ModelRole {

    static async getAll() {

        try {
            
            const roles = await Role.findAll();

            return {message : "Roles obtenidos", data : roles, status : 200};

        } catch (error) {
            console.error("Error al obtener roles", error);
            throw new Error("Error al obtener roles");
        }
    }


    static async create(data) {

        try {
            
            const rol = await Role.create(data);

            return {message : "Rol creado", data : rol, status : 201};

        } catch (error) {
            console.error("Error al crear rol:", error);
            throw new Error("Error al crear rol");
        }

    }

    static async update(rol_id, data) {
    
        try {

            const roleExists = await Role.findByPk(rol_id);

            if (!roleExists) {
                return {message : "Rol no encontrado", status : 404};
            }
            
            await Role.update(data, {where : {rol_id}});

            return {message : "Rol modificado", status : 200};

        } catch (error) {
            console.error("Error al modificar el rol por id", error);
            throw new Error("Error al modificar el rol por id");
        }
    }

    static async delete(rol_id) {

        try {

            const roleExists = await Role.findByPk(rol_id);

            if (!roleExists) {
                return {message : "Rol no encontrado", status : 404};
            }
            
            await Role.destroy({where : {rol_id}});

            return {message : "Rol eliminado", status : 200};

        } catch (error) {
            console.error("Error al eliminar el rol", error);
            throw new Error("Error al eliminar el rol");
        }
    }
}