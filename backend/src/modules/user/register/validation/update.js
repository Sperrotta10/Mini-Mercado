import zod from 'zod';

const updateUser = zod.object({
    nombre_completo: zod.string().min(1, { message : 'El nombre completo es requerido'}),
    cedula : zod.string().min(6, { message : 'La cédula es requerida'}).max(8, { message : 'La cédula debe tener un máximo de 8 caracteres' }),
    telefono: zod.string().min(10, { message : 'El teléfono es requerido'}).max(11, { message : 'El teléfono debe tener un máximo de 11 caracteres' }),
    username: zod.string().min(1, { message : 'El nombre de usuario es requerido'}).max(20, { message : 'El nombre de usuario debe tener un máximo de 20 caracteres' }),
    email: zod.string().email({ message : 'El email debe ser válido' }),
    password : zod.string().min(6, {message : "El password tiene que ser un string y como minimo 6 caracteres"})
        .regex(/[A-Z]/, { message : "Debe contener al menos una mayúscula"})
        .regex(/[0-9]/, { message : "Debe contener al menos un número"})
        .regex(/[^A-Za-z0-9]/, { message : "Debe contener al menos un carácter especial"}),
    suscripcion: zod.preprocess((val) => {
        if (val === 'true' || val === '1') return true;
        if (val === 'false' || val === '0') return false;
        return undefined;
    }, zod.boolean().optional()),
    status: zod.preprocess((val) => {
        if (val === 'true' || val === '1') return true;
        if (val === 'false' || val === '0') return false;
        return undefined;
    }, zod.boolean().optional()),
}).partial().refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
});

export function validateUpdateUser(data) {
    return updateUser.safeParse(data);
}