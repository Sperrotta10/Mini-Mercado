import { BaseController } from '../../../../controller/controller.js';
import { validateCreateUser } from "../validation/create.js"
import { validateUpdateUser } from "../validation/update.js";
import { validatePagination } from '../validation/get_pagination.js';
import { resolveRole } from '../helpers/roleHelper.js';
import { ModelUserRegister } from "../model/register.js"
import { enviroment } from '../../../../config/enviroment.js';

export class UserRegisterController extends BaseController {

  constructor() {
    super(ModelUserRegister, {
      create: validateCreateUser,
      update: validateUpdateUser
    });
  }

  create = async (req, res) => {
    const { rol } = req.user || {};
    const { role, ...userData } = req.body;
    const result = this.validators.create(userData);

    if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

    try {

      let roleResult;
      if(rol === 'admin') {

        roleResult = await resolveRole(role);
        if (!roleResult.success) return res.status(roleResult.status).json({ message: roleResult.message });

      }

      const rol_id = rol === 'admin' ? roleResult.rol_id : enviroment.ROLE_DEFAULT;

      const created = await this.model.create(result.data, rol_id);
      return res.status(created.status).json({ message: created.message, data: created.data ?? null });

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

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
  
}
