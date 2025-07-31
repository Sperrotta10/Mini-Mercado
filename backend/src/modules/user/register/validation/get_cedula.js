import zod from 'zod';

const getCedulaSchema = zod.object({
    cedula: zod
      .string()
      .min(6, { message: 'La cédula es requerida' })
      .max(12, { message: 'La cédula es muy larga' }) // por si llega con puntos
      .transform((val) => val.replace(/\./g, '')) // eliminar puntos
      .refine((val) => /^\d+$/.test(val), {
        message: 'La cédula solo debe contener números',
      })
      .refine((val) => val.length >= 6 && val.length <= 8, {
        message: 'La cédula debe tener entre 6 y 8 dígitos',
      })
});

export function validateCedula(cedula) {
    return getCedulaSchema.safeParse(cedula);
}