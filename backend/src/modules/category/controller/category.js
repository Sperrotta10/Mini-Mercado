import { BaseController } from "../../../controller/controller.js"
import { validateCreateCategory } from "../validation/create.js"
import { validateUpdateCategory } from "../validation/update.js"
import { validateParamsId } from "../../../helpers/params_id.js"
import { isImageFile } from "../../../helpers/images.js"
import { errorUploadImage } from "../../../helpers/upload_image.js"
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
    
    if (image){
        const resultImage = isImageFile(image);
        if (!resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });
    }

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    let filePath = null;
    const payload = result.data;
    const FOLDER = 'category';
    const BUCKET = 'category-images';

    try {

        // Subir imagen a Supabase
        const imageUrl = await uploadImage(image, FOLDER, BUCKET);
        if (!imageUrl) return res.status(500).json({ message: "Error al subir la imagen" });

        filePath = extractPathFromUrl(imageUrl);
        payload.image = imageUrl; // agregamos la URL de la imagen en los datos

        // Guardar la categoría en la base de datos
        const created = await this.model.create(payload);
        return res.status(created.status).json({ message: created.message, data: created.data ?? null });

    } catch (error) {

        // Si ocurre un error, revertir la carga de la imagen
        await errorUploadImage(filePath, BUCKET);

        return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  update = async (req, res) => {

    const { id } = req.params;
    const isValidId = validateParamsId({ id });
    if (!isValidId.success) return res.status(400).json({ message: "ID de categoría inválido", error: isValidId.error.errors });

    const image = req.files?.image;
    const body = req.body || {};

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
    const oldImageUrl = extractPathFromUrl(categoria.data?.image) || null;
    const BUCKET = 'category-images';
    const FOLDER = 'category';

    try {

        // Actualizar imagen de Supabase si se proporciona
        if (image) {
            const imageUrl = await uploadImage(image, FOLDER, BUCKET);
            if (!imageUrl) return res.status(500).json({ message: "Error al subir la imagen" });

            filePath = extractPathFromUrl(imageUrl);
            payload.image = imageUrl; // Actualizar la URL de la imagen en los datos
        }

        // Actualizar la categoría en la base de datos
        const update = await this.model.update(id, payload);

        // Si la actualización falla, revertir la carga de la imagen
        if (update.status !== 200) {
            await errorUploadImage(filePath, BUCKET);
            return res.status(update.status).json({ message: update.message });
        }

        // Verificar si la actualización fue exitosa
        if (oldImageUrl && filePath && filePath !== oldImageUrl && update.status === 200) {
            await deleteFile(oldImageUrl, BUCKET);
        }

        return res.status(update.status).json({message : update.message, data: update.data ?? null});

    } catch (error) {

        // Si ocurre un error, revertir la carga de la imagen
        await errorUploadImage(filePath, BUCKET);

        return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };
}