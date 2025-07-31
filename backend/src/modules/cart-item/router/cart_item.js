import { Router } from "express"
import { CartItemController } from "../controller/cart_item.js"
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"
import { readLimiter, writeLimiter} from "../../../middlewares/rate_limiters/cart-item/cart_item.js"

export const cartItemRouter = Router();

const cartItemController = new CartItemController();

cartItemRouter.post("/", authenticateHybrid, authorizeRoles('cliente'), writeLimiter, cartItemController.create);
cartItemRouter.get("/all/:id", authenticateHybrid, authorizeRoles('cliente'), readLimiter, cartItemController.getAll);
cartItemRouter.get("/:id", authenticateHybrid, authorizeRoles('cliente'), readLimiter, cartItemController.getId);
cartItemRouter.put("/:id", authenticateHybrid, authorizeRoles('cliente'), writeLimiter, cartItemController.update);
cartItemRouter.delete("/:id", authenticateHybrid, authorizeRoles('cliente'), writeLimiter, cartItemController.delete);
