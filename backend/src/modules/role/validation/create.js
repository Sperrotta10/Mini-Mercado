import zod from 'zod';

const createRole = zod.object({
    name: zod.string().min(1, { message: 'El nombre del rol es requerido' }),
}).strict();

export function validateCreateRole(data) {
    return createRole.safeParse(data);
}