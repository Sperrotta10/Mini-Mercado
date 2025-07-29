import { BaseController } from '../../../../controller/controller.js';
import { validateCreateUser } from "../validation/create.js"
import { validateUpdateUser } from "../validation/update.js";
import { validatePagination } from '../validation/get_pagination.js';
import { resolveRole } from '../helpers/roleHelper.js';
import { ModelUserRegister } from "../model/register.js"
import { enviroment } from '../../../../config/enviroment.js';
import { isImageFile } from '../../../../helpers/images.js';
import { uploadImage, extractPathFromUrl, deleteFile } from '../../../../utils/images.js';
import { errorUploadImage } from '../../../../helpers/upload_image.js';

export class UserRegisterController extends BaseController {

  constructor() {
    super(ModelUserRegister, {
      create: validateCreateUser,
      update: validateUpdateUser
    });
  }

  create = async (req, res) => {

    const result = this.validators.create(req.body);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    try {

      const rol_id = enviroment.ROLE_DEFAULT;

      const created = await this.model.create(result.data, rol_id);
      return res.status(created.status).json({ message: created.message, data: created.data ?? null });

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };


  createByAdmin = async (req, res) => {
    
    const { role, ...userData } = req.body;
    const result = this.validators.create(userData);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    try {
      
      const roleResult = await resolveRole(role);
      if (!roleResult.success) return res.status(roleResult.status).json({ message: roleResult.message });

      const created = await this.model.create(result.data, roleResult.rol_id);
      return res.status(created.status).json({ message: created.message, data: created.data ?? null });

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  }

  getCedula = async (req, res) => {

    const { cedula } = req.params;

    try {

      const data = await this.model.getCedula(cedula);
      return res.status(data.status).json({ message: data.message, data: data.data ?? null});

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

  getPaginationEmpleado = async (req, res) => {

    const result = validatePagination(req.query);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    const { page, limit, role } = result.data;
    const offset = (page - 1) * limit;

    try {
      
      const data = await this.model.getPaginationEmpleado(page, limit, offset, role);
      return res.status(data.status).json({ message: data.message, data: data.data ?? null});

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
      
    }
  }

  update = async (req, res) => {

    const image = req.files?.image_perfil;
    const body = req.body || {};

    if (Object.keys(body).length === 0 && !image) return res.status(400).json({ message: "No se proporcionaron datos para actualizar el usuario" });

    if (image) {
        const resultImage = isImageFile(image);
        if (!resultImage.success) return res.status(resultImage.status).json({ message: resultImage.message });
    }

    const { id } = req.params;
    const result = this.validators.update(body);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    const payload = result.data;
    let filePath = null;
    const FOLDER = 'perfiles';
    const BUCKET = 'perfil-images';

    try {

      if (image) {

        // subir imagen a Supabase si se proporciona
        const imageUrl = await uploadImage(image, FOLDER, BUCKET);

        // verificar si la URL de la imagen se obtuvo correctamente
        if (!imageUrl) return res.status(500).json({ message: "Error al subir la imagen" });

        // extraer la ruta del archivo de la URL
        filePath = extractPathFromUrl(imageUrl);
        payload.image_perfil = imageUrl; // agregamos la URL de la imagen en los datos
      }

      const updated = await this.model.update(id, payload);

      // si la actualización falla y hay una imagen, eliminarla
      if(updated.status !== 200) {
        await errorUploadImage(filePath, BUCKET); // eliminar imagen si ocurre un error
      }

      const user = await this.model.getId(id);

      // si la actualización fue exitosa y el usuario tiene una imagen, eliminar la imagen anterior
      if (user.status === 200 && user.data?.image_perfil) {
        const imageBeforeUpdate = user.data.image_perfil;
        await deleteFile(imageBeforeUpdate, BUCKET);
      }

      return res.status(updated.status).json({ message: updated.message, data: updated.data ?? null });
      
    } catch (error) {

      // Si ocurre un error, revertir la carga de la imagen
      await errorUploadImage(filePath, BUCKET);

      return res.status(500).json({ message: "Error interno", error: error.message });
    }

  }
  
}
