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
        const { role } = req.user;
        const { id } = req.params;
        const result = this.validators.update(req.body);

        if (!result.success)
        return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        try {
            if (role === 'admin') {
                
                const updated = await this.model.update(id, result.data);
                return res.status(updated.status).json({ message: updated.message, data: updated.data });

            } else if (role === 'empleado') {
                
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
}