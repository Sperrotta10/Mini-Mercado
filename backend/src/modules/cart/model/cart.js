import { Cart } from "../../../models/index.js"

export class cartModel {

    // crear carrito
    static async create(cartData) {
        
        try {
            const cart = await Cart.create(cartData);
            return { message: "Carrito creado", data: cart, status: 201 };
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw new Error("Error al crear el carrito");
        }
    }

    // obtener carrito por ID_cart
    static async getId(cartId) {

        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                return { message: "Carrito no encontrado", status: 404 };
            }
            return { message: "Carrito obtenido", data: cart, status: 200 };
        } catch (error) {
            console.error("Error al obtener el carrito por ID:", error);
            throw new Error("Error al obtener el carrito por ID");
        }
        
    }

    // obtener todos los carritos por el ID de usuario
    static async getAll(user_id) {

        try {
            const carts = await Cart.findAll({ where: { user_id } });
            return { message: "Carritos obtenidos", data: carts, status: 200 };
        } catch (error) {
            console.error("Error al obtener los carritos:", error);
            throw new Error("Error al obtener los carritos");
        }

    }

    // update carrito por ID_cart
    static async update(cartId, cartData) {
        
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                return { message: "Carrito no encontrado", status: 404 };
            }
            await cart.update(cartData);
            return { message: "Carrito actualizado", data: cart, status: 200 };
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            throw new Error("Error al actualizar el carrito");
        }
    }

    // delete carrito por ID_cart
    static async delete(cartId) {
        
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                return { message: "Carrito no encontrado", status: 404 };
            }
            await cart.destroy();
            return { message: "Carrito eliminado", status: 200 };
        } catch (error) {
            console.error("Error al eliminar el carrito:", error);
            throw new Error("Error al eliminar el carrito");
        }
    }
}