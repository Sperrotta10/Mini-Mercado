import { BaseController } from "../../../controller/controller.js";
import { validateCreateProduct } from "../validation/create.js"
import { validateUpdateProduct } from "../validation/update.js"
import { ProductModel } from "../model/product.js"

export class ProductController extends BaseController {

    constructor() {
        super( ProductModel, {
            create : validateCreateProduct,
            update : validateUpdateProduct
        });
    }

    getPaginatedWithFilters = async (req, res) => {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // aplicacion de filtros
        const filters = {
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null,
            minOferta: req.query.minOferta ? parseInt(req.query.minOferta) : null,
            maxOferta: req.query.maxOferta ? parseInt(req.query.maxOferta) : null,
            categoria: req.query.categoria ? parseInt(req.query.categoria) : null,
        };

        try {
            const result = await this.model.getPaginatedWithFilters(page, limit, offset, filters);
            return res.status(result.status).json({ message: result.message, data: result.data });
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };


    searchByName = async (req, res) => {
        const { name } = req.params;

        try {
            const result = await this.model.searchByName(name);
            return res.status(result.status).json({ message: result.message, data: result.data });
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

    // sobrescribiendo el método update
    update = async (req, res) => {
        const { rol } = req.user;
        const { id } = req.params;
        const result = this.validators.update(req.body);

        if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        console.log("Role del usuario:", rol);
        try {
            if (rol === 'admin') {
                
                const updated = await this.model.update(id, result.data);
                return res.status(updated.status).json({ message: updated.message, data: updated.data });

            } else if (rol === 'empleado') {
                
                const filtered = { stock: result.data.stock };
                const updated = await this.model.update(id, filtered);
                return res.status(updated.status).json({ message: updated.message, data: updated.data });

            } else {
                return res.status(403).json({ message: "No autorizado para actualizar" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

    // sobrescribiendo el método create (para poder crear un proucto o un array de productos)
    create = async (req, res) => {
        const data = req.body;

        try {
            // Si es un array, procesamos en lote
            if (Array.isArray(data)) {
                const results = [];

                for (const user of data) {
                    const validation = this.validators.create(user);

                    if (!validation.success) {
                        return res.status(400).json({ message: "Error de validación", error: validation.error.errors });
                    }

                    const result = await this.model.create(validation.data);
                    results.push({ success: true, data: result.data });
                }

                return res.status(207).json({ message: 'Procesamiento por lote', results });
            }

            // Si es solo un objeto
            const validation = this.validators.create(data);

            if (!validation.success) {
            return res.status(400).json({ message: 'Error de validación', errors: validation.error.errors });
            }

            const producto = await this.model.create(validation.data);
            return res.status(producto.status).json({ message: producto.message, data: producto.data });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear producto(s)', error });
        }
    }

}