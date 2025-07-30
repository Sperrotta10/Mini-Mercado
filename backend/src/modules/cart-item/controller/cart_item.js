import { BaseController } from "../../../controller/controller.js";
import { cartItemModel } from "../model/cart_item.js";
import { validateCreateCartItem } from "../validation/create.js";
import { validateUpdateCartItem } from "../validation/update.js";
import { validateParamsId } from "../../../helpers/params_id.js";

export class CartItemController extends BaseController {
    constructor() {
        super(cartItemModel, {
            create: validateCreateCartItem,
            update: validateUpdateCartItem
        });
    }

    create = async (req, res) => {

        const user_id = req.user.user_id;
        const validate = this.validators?.create;
        const result = validate ? validate(req.body) : { success: true, data: req.body };

        if (!result.success)
            return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        try {
            const created = await this.model.create(result.data, user_id);
            return res.status(created.status).json({ message: created.message, data: created.data ?? null });
        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

    getAll = async (req, res) => {

        const { id } = req.params;
        const isValidId = validateParamsId({ id });
        if (!isValidId.success) return res.status(400).json({ message: "ID de carrito inválido", error: isValidId.error.errors });

        const userId = req.user.user_id;

        try {

            const data = await this.model.getAll(id, userId);
            return res.status(data.status).json({ message: data.message, data: data.data });

        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    };

  update = async (req, res) => {

        const user_id = req.user.user_id;
        const { id } = req.params;
        const isValidId = validateParamsId({ id });
        if (!isValidId.success) return res.status(400).json({ message: "ID de carrito inválido", error: isValidId.error.errors });

        const validate = this.validators?.update;
        const result = validate ? validate(req.body) : { success: true, data: req.body };

        if (!result.success) return res.status(400).json({ message: "Error de validación", error: result.error.errors });

        try {

            const update = await this.model.update(id, result.data, user_id);
            return res.status(update.status).json({message : update.message, data: update.data ?? null});

        } catch (error) {
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
  };

  delete = async (req, res) => {

        const { id } = req.params;
        const isValidId = validateParamsId({ id });
        if (!isValidId.success) return res.status(400).json({ message: "ID de carrito inválido", error: isValidId.error.errors });

        const user_id = req.user.user_id;

        try {

            const destroy = await this.model.delete(id, user_id);
            return res.status(destroy.status).json({message : destroy.message, data: destroy.data ?? null});

        } catch (error) {
        return res.status(500).json({ message: "Error interno", error: error.message });
    }
  };
}