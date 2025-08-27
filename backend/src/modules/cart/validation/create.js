import zod from 'zod';

const createCart = zod.object({
    name: zod.string().min(1, { message: 'El nombre del carrito no puede estar vacío' }),
}).strict();

export function validateCreateCart(data) {
    return createCart.safeParse(data);
}