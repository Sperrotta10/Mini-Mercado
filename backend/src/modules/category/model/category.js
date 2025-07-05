import { Category } from "../../../models/index.js"

export class CategoryModel {

    static async getAll() {

        try {
            
            const categories = await Category.findAll();

            return {message : "Categorias obtenidos", data : categories, status : 200};

        } catch (error) {
            console.error("Error al obtener categorias", error);
            throw new Error("Error al obtener ategorias");
        }
    }

    static async getById(categoria_id) {

        try {

            const categoria = await Category.findByPk(categoria_id);

            if (!categoria) {
                return {message : "Categoria no encontrado", status : 404};
            }

            return {message : "Categoria obtenido", data : categoria, status : 200};

        } catch (error) {
            console.error("Error al obtener la categoria por id", error);
            throw new Error("Error al obtener la categoria por id");
        }

    }


    static async create(data) {

        try {
            
            const categoria = await Category.create(data);

            return {message : "Categoria creada", data : categoria, status : 201};

        } catch (error) {
            console.error("Error al crear categoria:", error);
            throw new Error("Error al crear categoria");
        }

    }

    static async update(categoria_id, data) {
    
        try {

            const categoriaExists = await Category.findByPk(categoria_id);

            if (!categoriaExists) {
                return {message : "Categoria no encontrado", status : 404};
            }
            
            await Category.update(data, {where : {categoria_id}});

            return {message : "Categoria modificado", status : 200};

        } catch (error) {
            console.error("Error al modificar la categoria por id", error);
            throw new Error("Error al modificar la categoria por id");
        }
    }

    static async delete(categoria_id) {

        try {

            const categoriaExists = await Category.findByPk(categoria_id);

            if (!categoriaExists) {
                return {message : "Categoria no encontrado", status : 404};
            }
            
            await Category.destroy({where : {categoria_id}});

            return {message : "Categoria eliminada", status : 200};

        } catch (error) {
            console.error("Error al eliminar la categoria", error);
            throw new Error("Error al eliminar la categoria");
        }
    }
}