import zod from 'zod';

const updateProduct = zod.object({
  name: zod.string().min(1, { message: 'El nombre del producto es requerido' }).optional(),

  price: zod
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform(Number)
    .refine(val => val > 0, { message: 'El precio debe ser un número positivo' })
    .optional(),

  stock: zod
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val >= 0, { message: 'El stock debe ser un número entero no negativo' })
    .optional(),

  stock_min: zod
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val >= 0, { message: 'El stock mínimo debe ser un número entero no negativo' })
    .optional(),

  oferta: zod
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val >= 0, { message: 'La oferta debe ser un número entero no negativo' })
    .optional(),

  categoria_id: zod
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val > 0, { message: 'El ID de la categoría debe ser un número entero positivo' })
    .optional(),

  status: zod
    .string()
    .regex(/^(true|false)$/i, { message: 'El estado debe ser "true" o "false"' })
    .transform(val => val.toLowerCase() === 'true')
    .optional()

}).partial()


export function validateUpdateProduct(data) {
    return updateProduct.safeParse(data);
}