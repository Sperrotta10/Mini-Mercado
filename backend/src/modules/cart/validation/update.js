import zod from 'zod';

const updateCart = zod.object({
    name: zod.string().min(1, { message: 'El nombre del carrito no puede estar vacío' }),
}).strict();

export function validateUpdateCart(data) {
    return updateCart.safeParse(data);
}