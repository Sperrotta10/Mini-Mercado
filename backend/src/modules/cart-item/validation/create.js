import zod from 'zod';

const createCartItem = zod.object({
    cart_id: zod.number().int().positive({ message: 'El ID del carrito debe ser un número entero positivo' }),
    product_id: zod.number().int().positive({ message: 'El ID del producto debe ser un número entero positivo' }),
    quantity: zod.number().int().positive({ message: 'La cantidad debe ser un número entero positivo' }),
}).strict();

export function validateCreateCartItem(data) {
    return createCartItem.safeParse(data);
}