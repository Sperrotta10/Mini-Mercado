import zod from 'zod';

const updateProduct = zod.object({
    name: zod.string().min(1, { message: 'El nombre del producto es requerido' }),
    image: zod.string().url({ message: 'La imagen debe ser una URL válida' }),
    price: zod.number().positive({ message: 'El precio debe ser un número positivo' }),
    stock: zod.number().int().nonnegative({ message: 'El stock debe ser un número entero no negativo' }),
    stock_min: zod.number().int().nonnegative({ message: 'El stock mínimo debe ser un número entero no negativo' }),
    oferta: zod.number().int().nonnegative({ message: 'La oferta debe ser un número entero no negativo' }).default(0),
    categoria_id: zod.number().int().positive({ message: 'El ID de la categoría debe ser un número entero positivo' }),
}).partial().refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para crear el producto',
});

export function validateUpdateProduct(data) {
    return updateProduct.safeParse(data);
}