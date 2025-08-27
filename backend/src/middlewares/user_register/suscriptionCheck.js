import { User, Cart } from "../../models/index.js";
import { updateCartSubscription } from "../../utils/updateCartSuscription.js"

export const updateSubscriptionStatus = async (req, res, next) => {
  
    try {
        const userId = req.user.user_id;
        const now = new Date();

        // Obtener usuario con TODOS los carritos (activos y desactivados)
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const expired = user.subscription_expires_at && new Date(user.subscription_expires_at) <= now;

        // 🟥 CASO 1: La suscripción expiró → pasar a free
        if (user.suscripcion === false && expired) {
            await User.update({
                suscripcion: false,
                subscription_expires_at: null,
                subscription_started_at: null,
            }, {
                where: { user_id: userId }
            });

            await updateCartSubscription(user, 'free');
        }

        /*
        // 🟩 CASO 2: El usuario renovó a premium y aún no reactivó sus carritos
        if (user.suscripcion === true && !expired) {
            // Reactivar hasta 15 carritos si están desactivados
            await updateCartSubscription(user, 'premium');
        }
        */

        next();
    } catch (error) {
        console.error("Error al actualizar la suscripción:", error);
        next(); // Continuar la ejecución a pesar del error
    }
};
