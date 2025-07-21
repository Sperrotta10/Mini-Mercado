import { BaseController } from "../../../controller/controller.js"
import { validateCreateCart } from "../validation/create.js";
import { validateUpdateCart } from "../validation/update.js";
import { cartModel } from "../model/cart.js"

export class CartController extends BaseController {
    
    constructor() {
        super(cartModel, {
            create: validateCreateCart,
            update: validateUpdateCart
        });
    }

    create = async (req, res) => {
        const validate = this.validators?.create;
        const result = validate ? validate(req.body) : { success: true, data: req.body };

        if (!result.success)
        return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        try {

            const cartData = {
                ...result.data,
                user_id: req.user.user_id
            };

            const created = await this.model.create(cartData);
            return res.status(created.status).json({ message: created.message, data: created.data ?? null });
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
  };

  getAll = async (req, res) => {

    const userId = req.user.user_id;

    try {

      const data = await this.model.getAll(userId);
      return res.status(data.status).json({ message: data.message, data: data.data });

    } catch (error) {
      return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };

}