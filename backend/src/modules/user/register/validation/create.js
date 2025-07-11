import zod from 'zod';

const createUser = zod.object({
    username: zod.string().min(1, { message : 'El nombre de usuario es requerido'}).max(20, { message : 'El nombre de usuario debe tener un máximo de 20 caracteres' }),
    email: zod.string().email({ message : 'El email debe ser válido' }),
    password : zod.string().min(6, {message : "El password tiene que ser un string y como minimo 6 caracteres"})
        .regex(/[A-Z]/, { message : "Debe contener al menos una mayúscula"})
        .regex(/[0-9]/, { message : "Debe contener al menos un número"})
        .regex(/[^A-Za-z0-9]/, { message : "Debe contener al menos un carácter especial"}),
}).strict();

export function validateCreateUser(data) {
    return createUser.safeParse(data);
}