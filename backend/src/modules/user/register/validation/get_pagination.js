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
    role: zod.enum(['empleado'])
})

export function validatePagination(data) {

    return paginationSchema.safeParse(data)
}