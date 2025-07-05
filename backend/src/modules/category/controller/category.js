import { BaseController } from "../../../controller/controller.js"
import { validateCreateCategory } from "../validation/create.js"
import { validateUpdateCategory } from "../validation/update.js"
import { isImageFile } from "../../../helpers/images.js"
import { uploadImage, extractPathFromUrl, deleteFile } from "../../../utils/images.js"
import { CategoryModel } from "../model/category.js"

export class CategoryController extends BaseController {

    constructor() {
        super(CategoryModel, {
            create : validateCreateCategory,
            update : validateUpdateCategory
        })
    }

    create = async (req, res) => {

    const image = req.files?.image;

    const validate = this.validators?.create;
    const result = validate ? validate(req.body) : { success: true, data: req.body };
    const resultImage = isImageFile(image);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    if (image && !resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });

    let filePath = null;

    try {

        // Subir imagen a Supabase
        const imageUrl = await uploadImage(image, 'category', 'category-images');
        filePath = extractPathFromUrl(imageUrl);
        result.data.image = imageUrl; // agregamos la URL de la imagen en los datos

        // Guardar la categoría en la base de datos
        const created = await this.model.create(result.data);
        return res.status(created.status).json({ message: created.message, data: created.data ?? null });

    } catch (error) {

        if (filePath) {
            // Si hubo un error, eliminar la imagen subida
            try {
                await deleteFile(filePath, 'category-images');
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }

        return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  update = async (req, res) => {

    const { id } = req.params;
    const image = req.files?.image;
    const body = req.body || {};

    console.log("Datos recibidos para actualizar:", body);
    console.log("Imagen recibida:", image);

    if (Object.keys(body).length === 0 && !image) return res.status(400).json({ message: "No se proporcionaron datos para actualizar" });

    if (image){
        const resultImage = isImageFile(image);
        if (!resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });
    }

    const validate = this.validators?.update;
    const result = validate ? validate(body) : { success: true, data: body };
    

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });
    
    const categoria = await this.model.getById(id);

    if (categoria.status !== 200) return res.status(categoria.status).json({ message: categoria.message });

    let filePath = null;
    const payload = result.data;
    const oldImageUrl = categoria.data.image;
    const BUCKET = 'category-images';
    const FOLDER = 'category';

    try {

        // Actualizar imagen de Supabase si se proporciona
        if (image) {
            const imageUrl = await uploadImage(image, FOLDER, BUCKET);
            filePath = extractPathFromUrl(imageUrl);
            payload.image = imageUrl; // Actualizar la URL de la imagen en los datos
        }

        // Actualizar la categoría en la base de datos
        const update = await this.model.update(id, payload);
        if (oldImageUrl && update.status === 201) {
            await deleteFile(oldImageUrl, BUCKET); // Eliminar imagen antigua si la actualización es exitosa
        }
        return res.status(update.status).json({message : update.message, data: update.data ?? null});

    } catch (error) {


        if (filePath) {
            // Si hubo un error, eliminar la imagen subida
            try {
                await deleteFile(filePath, BUCKET);
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }

        return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };
}