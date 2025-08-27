import zod from "zod";

const validationResetPassword = zod.object({
  token: zod.string().min(1, "Token is required"),
  password : zod.string().min(6, {message : "El password tiene que ser un string y como minimo 6 caracteres"})
        .regex(/[A-Z]/, { message : "Debe contener al menos una mayúscula"})
        .regex(/[0-9]/, { message : "Debe contener al menos un número"})
        .regex(/[^A-Za-z0-9]/, { message : "Debe contener al menos un carácter especial"}),
});

export function validateResetPasswordData(data) {
  return validationResetPassword.safeParse(data);
}
