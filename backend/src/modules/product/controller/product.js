import { BaseController } from "../../../controller/controller.js";
import { validateCreateProduct } from "../validation/create.js"
import { validateCreateAllProduct } from "../validation/create_all.js"
import { validateUpdateProduct } from "../validation/update.js"
import { validatePagination } from "../validation/get_pagination.js"
import { isImageFile } from "../../../helpers/images.js"
import { errorUploadImage } from "../../../helpers/upload_image.js"
import { uploadImage, deleteFile, extractPathFromUrl } from "../../../utils/images.js"
import { ProductModel } from "../model/product.js"

export class ProductController extends BaseController {

    constructor() {
        super( ProductModel, {
            create : validateCreateProduct,
            update : validateUpdateProduct
        });
    }

    create = async (req, res) => {

        const image = req.files?.image;

        if (image) {
            const resultImage = isImageFile(image);
            if (!resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });
        }

        const validate = this.validators?.create;
        const result = validate ? validate(req.body) : { success: true, data: req.body };

        if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        const payload = result.data;
        const FOLDER = 'productos';
        const BUCKET = 'product-images';
        let filePath = null;

        try {

            // subir imagen a Supabase
            const imageUrl = await uploadImage(image, FOLDER, BUCKET);

            if (!imageUrl) return res.status(500).json({ message: "Error al subir la imagen" });

            filePath = extractPathFromUrl(imageUrl);
            payload.image = imageUrl; // agregamos la URL de la imagen en los datos

            // guardar el producto en la base de datos
            const created = await this.model.create(payload);

            if (created.status === 409) {
                
                console.error("El producto ya existe:", created.message, filePath);
                await errorUploadImage(filePath, BUCKET);
            }

            return res.status(created.status).json({ message: created.message, data: created.data ?? null });

        } catch (error) {

            await errorUploadImage(filePath, BUCKET);

            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

    getPaginatedWithFilters = async (req, res) => {
        
        const { rol } = req.user;
        const result = validatePagination(req.query);

        if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        const { page, limit, ...filters} = result.data;

        const offset = (page - 1) * limit;

        try {
            const response = await this.model.getPaginatedWithFilters(page, limit, offset, filters, rol);
            return res.status(response.status).json({ message: response.message, data: response.data });
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

        const image = req.files?.image;
        const body = req.body || {};

        if (Object.keys(body).length === 0 && !image) return res.status(400).json({ message: "No se proporcionaron datos para actualizar el producto" });

        if (image) {
            const resultImage = isImageFile(image);
            if (!resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });
        }

        const { rol } = req.user;
        const { id } = req.params;
        const result = this.validators.update(body);

        if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        console.log("Role del usuario:", rol);
        const payload = result.data;
        let filePath = null;
        const FOLDER = 'productos';
        const BUCKET = 'product-images';

        try {
            if (rol === 'admin') {

                try {
                 
                    if (image) {

                        // subir imagen a Supabase si se proporciona
                        const imageUrl = await uploadImage(image, FOLDER, BUCKET);

                        if (!imageUrl) return res.status(500).json({ message: "Error al subir la imagen" });

                        filePath = extractPathFromUrl(imageUrl);
                        payload.image = imageUrl; // agregamos la URL de la imagen en los datos
                    }
                

                    const product = await this.model.getId(id);

                    if (product.status !== 200) {

                        await errorUploadImage(filePath, BUCKET);

                        return res.status(product.status).json({ message: product.message, data: product.data ?? null });
                    }
                
                    // actualizar el producto en la base de datos
                    const updated = await this.model.update(id, payload, rol);
                    if (updated.status === 200) {
                        
                        if (filePath && product.data.image && product.data.image !== payload.image) {
                            await deleteFile(product.data.image, BUCKET);
                        }
                        return res.status(updated.status).json({ message: updated.message, data: updated.data ?? null });
                    }
                    return res.status(updated.status).json({ message: updated.message, data: updated.data });

                } catch (error) {

                    await errorUploadImage(filePath, BUCKET);

                    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
                }

            } else if (rol === 'empleado') {
                
                const filtered = { stock: result.data.stock };
                const updated = await this.model.update(id, filtered, rol);
                return res.status(updated.status).json({ message: updated.message, data: updated.data });

            } else {
                return res.status(403).json({ message: "No autorizado para actualizar" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

    // sobrescribiendo el método create (para poder crear un proucto o un array de productos)
    createAll = async (req, res) => {
        const data = req.body;

        try {
            // Si es un array, procesamos en lote
            if (Array.isArray(data)) {
                const results = [];

                for (const user of data) {
                    const validation = validateCreateAllProduct(user);

                    if (!validation.success) {
                        return res.status(400).json({ message: "Error de validación", error: validation.error.errors });
                    }

                    const result = await this.model.create(validation.data);
                    results.push({ success: true, data: result.data });
                }

                return res.status(207).json({ message: 'Procesamiento por lote', results });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear producto(s)', error });
        }
    }

}