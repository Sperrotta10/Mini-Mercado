import { User, Cart } from "../../models/index.js";

export const updateSubscriptionStatus = async (req, res, next) => {
  
    try {
        const userId = req.user.user_id;

        const userExists = await User.findOne({ 
            where: { user_id: userId },
            include: {
                model: Cart,
                as: 'carts',
                required: false, // Permite que el usuario se devuelva incluso si no tiene carritos
                where: { status: true },
            }
        });

        if (!userExists) return res.status(404).json({ message: "Usuario no encontrado" });

        const now = new Date();

        if (userExists.suscripcion === false && userExists.subscription_expires_at && new Date(userExists.subscription_expires_at) <= now) {

            // Si la suscripción ha expirado, actualizamos el estado
            await User.update({
                suscripcion: false,
                subscription_expires_at: null,
                subscription_started_at: null,
            }, {
                where: {
                    user_id: userId
                }
            });

            const activeCarts = userExists.carts || [];

            // Si no tiene suscripción, limitamos a 3 carritos activo
            // Desactivamos carritos excedentes si existen
            if (activeCarts.length >= 3) {

                // Ordenamos por fecha de creación (por ejemplo)
                const sorted = [...activeCarts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const cartsToDeactivate = sorted.slice(3);

                await Cart.update(
                    { status: false },
                    { where: { cart_id: cartsToDeactivate.map(c => c.cart_id) } }
                );

                console.log(`Suscripción expirada para ${userExists.email}. ${cartsToDeactivate.length} carritos desactivados.`);
            } else {
                console.log(`Suscripción expirada para ${userExists.email}. No había carritos excedentes.`);
            }

        }

        next();
    } catch (error) {
        console.error("Error al actualizar la suscripción:", error);
        next(); // Siempre continuar, incluso si hay error, para no bloquear al usuario
    }
};
