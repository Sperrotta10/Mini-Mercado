import zod from 'zod';

const paramsIdSchema = zod.object({
    id: zod.string().regex(/^\d+$/, { message: "El ID debe ser un número entero positivo" })
});

export function validateParamsId(params) {
    return paramsIdSchema.safeParse(params);
}