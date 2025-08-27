import zod from 'zod';

const createcategory = zod.object({
    name: zod.string().min(1, { message: 'El nombre de la categoría es requerido' }),
}).strict();

export function validateCreateCategory(data) {
    return createcategory.safeParse(data);
}