import zod from "zod";

const paginationSchema = zod.object({
  page: zod.string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val > 0, { message: 'La página debe ser mayor a 0' })
    .default('1'),

  limit: zod.string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val > 0, { message: 'El límite debe ser mayor a 0' })
    .default('10'),

  minPrice: zod.string()
    .optional()
    .transform(val => val ? parseFloat(val) : null)
    .refine(val => val === null || val >= 0, { message: 'minPrice debe ser >= 0' }),

  maxPrice: zod.string()
    .optional()
    .transform(val => val ? parseFloat(val) : null)
    .refine(val => val === null || val >= 0, { message: 'maxPrice debe ser >= 0' }),

  minOferta: zod.string()
    .optional()
    .transform(val => val ? parseInt(val) : null)
    .refine(val => val === null || val >= 0, { message: 'minOferta debe ser >= 0' }),

  maxOferta: zod.string()
    .optional()
    .transform(val => val ? parseInt(val) : null)
    .refine(val => val === null || val >= 0, { message: 'maxOferta debe ser >= 0' }),

  categoria: zod.string()
    .optional()
    .transform(val => val ? parseInt(val) : null)
    .refine(val => val === null || val > 0, { message: 'La categoría debe ser un ID válido' }),
})
.refine((data) => {
  if (data.minPrice !== null && data.maxPrice !== null) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  path: ['minPrice'],
  message: 'minPrice no puede ser mayor que maxPrice'
})
.refine((data) => {
  if (data.minOferta !== null && data.maxOferta !== null) {
    return data.minOferta <= data.maxOferta;
  }
  return true;
}, {
  path: ['minOferta'],
  message: 'minOferta no puede ser mayor que maxOferta'
});


export function validatePagination(data) {

    return paginationSchema.safeParse(data)
}