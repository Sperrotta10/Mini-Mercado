import zod from "zod";

const updateCategory = zod.object({
    name : zod.string().min(1, { message: "El nombre de la categoría es requerido" }).optional(),
}).partial();

export function validateUpdateCategory(data) {
    return updateCategory.safeParse(data);
}