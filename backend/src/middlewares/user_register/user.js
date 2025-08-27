import { validateParamsId } from "../../helpers/params_id.js";

export const verifyUserOwnership = async (req, res, next) => {
    const userId = req.params.id;
    const isValidId = validateParamsId({ id: userId });
    if (!isValidId.success) return res.status(400).json({ message: "ID de usuario inválido", error: isValidId.error.errors });
    
    const currentUserId = req.user.user_id;
    const isAdmin = req.user.rol === 'admin';

    if (Number(userId) !== Number(currentUserId) && !isAdmin) {
        return res.status(403).json({ message: "No tienes permiso para acceder a este usuario" });
    }

    next();
}