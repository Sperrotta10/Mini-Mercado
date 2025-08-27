import { Cart } from '../models/index.js';

export async function updateCartSubscription(user, currentPlan = 'free') {

    const MAX_CARTS_BY_PLAN = {
        free: 3,
        premium: 15
    };

    const maxAllowed = MAX_CARTS_BY_PLAN[currentPlan];

    // Buscar todos los carritos del usuario, incluyendo desactivados
    const allCarts = await Cart.findAll({
        where: { user_id: user.user_id },
        order: [['createdAt', 'ASC']]
    });

    if (!allCarts.length) {
        console.log(`El usuario ${user.email} no tiene carritos.`);
        return;
    }

    const cartsToActivate = allCarts.slice(0, maxAllowed);
    const cartsToDeactivate = allCarts.slice(maxAllowed);

    // Activamos los carritos permitidos según el plan
    if (cartsToActivate.length) {
        await Cart.update(
            { status: true },
            { where: { cart_id: cartsToActivate.map(c => c.cart_id) } }
        );
    }

    // Desactivamos los carritos que exceden el límite
    if (cartsToDeactivate.length) {
        await Cart.update(
            { status: false },
            { where: { cart_id: cartsToDeactivate.map(c => c.cart_id) } }
        );
    }

    console.log(`Se actualizaron los carritos para el usuario ${user.email} según su plan '${currentPlan}'.`);
    console.log(`Activados: ${cartsToActivate.length}, Desactivados: ${cartsToDeactivate.length}`);
}