import zod from 'zod';

const cedulaSchema = zod
  .string()
  .min(6, { message: 'La cédula es requerida' })
  .max(12, { message: 'La cédula es muy larga' }) // por si llega con puntos
  .transform((val) => val.replace(/\./g, '')) // eliminar puntos
  .refine((val) => /^\d+$/.test(val), {
    message: 'La cédula solo debe contener números',
  })
  .refine((val) => val.length >= 6 && val.length <= 8, {
    message: 'La cédula debe tener entre 6 y 8 dígitos',
  });

const telefonoSchema = zod
  .string()
  .min(10, { message: 'El teléfono es requerido' })
  .max(15, { message: 'El teléfono es muy largo' }) // por si llega con guiones
  .transform((val) => val.replace(/-/g, '')) // eliminar guiones
  .refine((val) => /^0(412|414|416|424|426)\d{7}$/.test(val), {
    message: 'El número de teléfono no es válido. Ej: 0414-1234567',
  });

const updateUser = zod.object({
    nombre_completo: zod.string().min(1, { message : 'El nombre completo es requerido'}),
    cedula : cedulaSchema,
    telefono: telefonoSchema,
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
    subscription_started_at: zod.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      zod.date().optional()
    ),
    subscription_expires_at: zod.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      zod.date().optional()
    ),
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