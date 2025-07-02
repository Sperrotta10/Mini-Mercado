import zod from "zod";

const paginationSchema = zod.object({
    page: zod.string().regex(/^\d+$/).transform(Number).default('1'),
    limit: zod.string().regex(/^\d+$/).transform(Number).default('10'),
    role: zod.enum(['empleado'])
})

export function validatePagination(data) {

    return paginationSchema.safeParse(data)
}