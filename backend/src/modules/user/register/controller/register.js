import { BaseController } from '../../../../controller/controller.js';
import { validateCreateUser } from "../validation/create.js"
import { validateUpdateUser } from "../validation/update.js";
import { ModelUserRegister } from "../model/register.js"

export class UserRegisterController extends BaseController {

  constructor() {
    super(ModelUserRegister, {
      create: validateCreateUser,
      update: validateUpdateUser
    });
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
  
}
