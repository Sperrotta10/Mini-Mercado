import zod from 'zod';

const createProduct = zod.object({
  name: zod.string().min(1, { message: 'El nombre del producto es requerido' }),
  price: zod
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'El precio debe ser un número válido' })
    .transform(Number)
    .refine((val) => val > 0, { message: 'El precio debe ser positivo' }),

  stock: zod
    .string()
    .regex(/^\d+$/, { message: 'El stock debe ser un número entero' })
    .transform(Number),

  stock_min: zod
    .string()
    .regex(/^\d+$/, { message: 'El stock mínimo debe ser un número entero' })
    .transform(Number),

  oferta: zod
    .string()
    .regex(/^\d+$/, { message: 'La oferta debe ser un número entero' })
    .transform(Number)
    .default("0"),

  categoria_id: zod
    .string()
    .regex(/^\d+$/, { message: 'El ID de la categoría debe ser un número entero positivo' })
    .transform(Number)
    .refine((val) => val > 0, { message: 'El ID de categoría debe ser positivo' }),
})
.refine((data) => {
  return data.stock_min <= data.stock;
}, {
  path: ['stock_min'],
  message: 'El stock mínimo no puede ser mayor que el stock total'
});



export function validateCreateProduct(data) {
    return createProduct.safeParse(data);
}