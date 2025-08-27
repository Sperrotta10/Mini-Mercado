import zod from 'zod';

const updateCartItem = zod.object({
    quantity: zod.number().int().positive({ message: 'La cantidad debe ser un número entero positivo' }),
}).strict();

export function validateUpdateCartItem(data) {
    return updateCartItem.safeParse(data);
}