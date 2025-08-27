import zod from 'zod';

const validateLogin = zod.object({
    email: zod.string().email({ message: 'Invalid email address' }),
    password: zod.string().min(6, {message : "El password tiene que ser un string y como minimo 6 caracteres"})
            .regex(/[A-Z]/, { message : "Debe contener al menos una mayúscula"})
            .regex(/[0-9]/, { message : "Debe contener al menos un número"})
            .regex(/[^A-Za-z0-9]/, { message : "Debe contener al menos un carácter especial"})
}).strict();

export function validateLoginData(data) {
    return validateLogin.safeParse(data);
}