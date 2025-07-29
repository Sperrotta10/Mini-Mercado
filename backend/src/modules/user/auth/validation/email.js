import zod from "zod";

const validationEmail = zod.object({
    email: zod.string().email("El email no es valido")
});

export function validateEmail(data) {
    return validationEmail.safeParse(data);
}