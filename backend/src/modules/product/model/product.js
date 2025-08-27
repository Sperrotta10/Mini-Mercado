import { Product, Category } from "../../../models/index.js"
import { deleteFile, extractPathFromUrl } from "../../../utils/images.js"
import { Op } from "sequelize";

export class ProductModel {

    static async getAll() {

        try {
            
            const products = await Product.findAll();

            return {message : "Productos obtenidos", data : products, status : 200};

        } catch (error) {
            console.error("Error al obtener productos", error);
            throw new Error("Error al obtener productos");
        }
    }

    static async getId(product_id) {

        try {
            
            const product = await Product.findByPk(product_id);

            if(!product) return {message : "Producto no encontrado", status : 404};

            return {message : "Producto obtenido", data : product, status : 200};

        } catch (error) {
            console.error("Error al obtener producto", error);
            throw new Error("Error al obtener producto");
        }
    }

    static async getPaginatedWithFilters(page, limit, offset, filters, role) {

        try {

            const where = {};

            if (filters.minPrice || filters.maxPrice) {
                where.price = {
                ...(filters.minPrice && { [Op.gte]: filters.minPrice }),
                ...(filters.maxPrice && { [Op.lte]: filters.maxPrice }),
                };
            }

            if (filters.minOferta || filters.maxOferta) {
                where.oferta = {
                ...(filters.minOferta && { [Op.gte]: filters.minOferta }),
                ...(filters.maxOferta && { [Op.lte]: filters.maxOferta }),
                };
            }

            if (filters.categoria) {
                const category = await Category.findByPk(filters.categoria);
                if (!category) {
                    return { message: "Categoría no encontrada", status: 404 };
                }
                where.categoria_id = filters.categoria;
            }

            if (role !== 'admin') {
                where.status = true; // Solo productos activos para usuarios no administradores
            }

            const { count, rows: products } = await Product.findAndCountAll({
                where,
                limit,
                offset,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            return {
                message: 'Productos filtrados',
                status: 200,
                data: {
                    currentPage: page,
                    totalPages: Math.ceil(count / limit),
                    totalItems: count,
                    products
                }
            };
            
        } catch (error) {
            console.error("Error al obtener productos con paginación y filtros", error);
            throw new Error("Error al obtener productos con paginación y filtros");
            
        }
    }


    static async searchByName(name) {

        try {
            const products = await Product.findAll({
            where: {
                name: {
                [Op.like]: `%${name}%`
                },
                status: true // Solo productos activos
            }
            });

            if (products.length > 0) {
                return { status: 200, message: "Productos encontrados", data: products };
            } else {
                return { status: 404, message: "No se encontraron productos", data: [] };
            }

        } catch (error) {
            console.error("Error al buscar productos:", error);
            throw error;
        }
    }


    static async create(data) {

        try {

            const categoryExists = await Category.findByPk(data.categoria_id);

            if (!categoryExists) return {message : "Categoría no encontrada", status : 404};


            const productExists = await Product.findOne({where: { name: data.name }});

            if (productExists) return {message : "El producto ya existe", status : 409};
            
            const product = await Product.create(data);

            return {message : "Producto creado", data : product, status : 201};

        } catch (error) {
            console.error("Error al crear producto:", error);
            throw new Error("Error al crear producto");
        }

    }

    static async update(product_id, data, role) {
    
        try {

            const productExists = await Product.findByPk(product_id);

            if (!productExists) {
                return {message : "Producto no encontrado", status : 404};
            }

            if (role !== 'admin' && productExists.status === false) {
                return {message : "No tienes permiso para modificar este producto", status : 403};
            }
            
            await Product.update(data, {where : {product_id}});

            return {message : "Producto modificado", status : 200};

        } catch (error) {
            console.error("Error al modificar el producto por id", error);
            throw new Error("Error al modificar el producto por id");
        }
    }

    static async delete(product_id) {

        try {

            const BUCKET = 'product-images';
            const productExists = await Product.findByPk(product_id);

            if (!productExists) {
                return {message : "Producto no encontrado", status : 404};
            }
            
            const deleted = await Product.destroy({where : {product_id}});

            if (deleted === 0) return { message: "Producto no encontrado", status: 404 };


            if (productExists.image) {
                console.log("Eliminando imagen del producto:", productExists.image);
                const imagePath = extractPathFromUrl(productExists.image);
                if (!imagePath) {
                    console.error("Error al extraer la ruta de la imagen del producto");
                    throw new Error("Error al extraer la ruta de la imagen del producto");
                }
                await deleteFile(imagePath, BUCKET);
            }
            

            return {message : "Producto eliminado", status : 200};

        } catch (error) {
            console.error("Error al eliminar el producto", error);
            throw new Error("Error al eliminar el producto");
        }
    }

} 