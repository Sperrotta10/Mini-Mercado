import { CartItem, Cart, Product, User } from "../../../models/index.js";

export class cartItemModel {

    // crear item de carrito
    static async create(cartItemData, user_id) {
        try {

            const { cart_id, product_id } = cartItemData;

            const cartExists = await Cart.findOne({
                where: { cart_id: cart_id, user_id: user_id, status: true },
            });

            if (!cartExists) return { message: "Carrito no encontrado", status: 404 };

            const productExists = await Product.findByPk(product_id);
            if (!productExists) return { message: "Producto no encontrado", status: 404 };

            const cartItem = await CartItem.create(cartItemData);
            return { message: "Item de carrito creado", data: cartItem, status: 201 };

        } catch (error) {
            console.error("Error al crear el item de carrito:", error);
            throw new Error("Error al crear el item de carrito");
        }
    }

    // obtener item de carrito por ID
    static async getId(itemId) {
        try {
            const cartItem = await CartItem.findByPk(itemId, {
                include: [{ 
                    model: Cart, 
                    as: 'cart',
                    required: true, // Asegura que el carrito exista
                    where: { status: true } // Solo carritos activos
                }]
            });
            if (!cartItem) {
                return { message: "Item de carrito no encontrado", status: 404 };
            }
            return { message: "Item de carrito obtenido", data: cartItem, status: 200 };

        } catch (error) {
            console.error("Error al obtener el item de carrito por ID:", error);
            throw new Error("Error al obtener el item de carrito por ID");
        }
    }

    // obtener todos los items de un carrito por ID_cart
    static async getAll(cartId, user_id) {
        try {
            const cartItems = await CartItem.findAll({
                where: { cart_id: cartId },
                include: [
                    { 
                        model: Cart, 
                        as: 'cart', 
                        required: true,
                        where: { user_id, status: true } 
                    }, 
                    { 
                        model: Product, 
                        as: 'product' 
                    }
                ],
            });

            if (cartItems.length === 0) {
                return { message: "No tienes permisos para ver este carrito o está vacío", data: [], status: 403 };
            }

            return { message: "Items de carrito obtenidos", data: cartItems, status: 200 };

        } catch (error) {
            console.error("Error al obtener los items de carrito:", error);
            throw new Error("Error al obtener los items de carrito");
        }
    }

    // actualizar item de carrito por ID
    static async update(itemId, cartItemData, user_id) {
        try {
            const cartItem = await CartItem.findOne({
                where: { item_id: itemId },
                include: {
                    model: Cart,
                    as: "cart",
                    required: true,
                    where: { user_id, status: true },
                },
            });

            if (!cartItem) {
                return { message: "No autorizado o item no encontrado", status: 403 };
            }

            await cartItem.update(cartItemData);
            return { message: "Item de carrito actualizado", data: cartItem, status: 200 };
        } catch (error) {
            console.error("Error al actualizar el item de carrito:", error);
            throw new Error("Error al actualizar el item de carrito");
        }
    }

    // eliminar item de carrito por ID
    static async delete(itemId, user_id) {
        try {

            const cartItem = await CartItem.findOne({
                where: { item_id: itemId },
                include: {
                    model: Cart,
                    as: "cart",
                    required: true,
                    where: { user_id, status: true },
                },
            });
            
            if (!cartItem) {
                return { message: "No autorizado o item no encontrado", status: 403 };
            }

            await cartItem.destroy();
            return { message: "Item de carrito eliminado", status: 200 };

        } catch (error) {
            console.error("Error al eliminar el item de carrito:", error);
            throw new Error("Error al eliminar el item de carrito");
        }
    }
}