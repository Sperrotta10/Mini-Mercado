import { cartModel } from "../../modules/cart/model/cart.js";

export const verifyCartOwnership = async (req, res, next) => {
    const cartId = req.params.id;
    const userId = req.user.user_id;

    try {
        const cart = await cartModel.getId(cartId);
        
        if (cart.status === 404) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        if (cart.data.user_id !== userId) {
            return res.status(403).json({ message: "No tienes permiso para acceder a este carrito" });
        }

        next();
    } catch (error) {
        console.error("Error al verificar la propiedad del carrito:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}