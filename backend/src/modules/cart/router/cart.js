import { Router } from "express"
import { CartController } from "../controller/cart.js"
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"
import { verifyCartOwnership } from "../../../middlewares/cart_shopping/authCart.js"
import { createLimiter, deleteLimiter, readLimiter, updateLimiter } from "../../../middlewares/rate_limiters/cart/cart.js"

export const cartRouter = Router()

const cartController = new CartController()

cartRouter.post("/", authenticateHybrid, authorizeRoles('cliente'), createLimiter, cartController.create)
cartRouter.get("/", authenticateHybrid, authorizeRoles('cliente'), readLimiter, cartController.getAll)
cartRouter.get("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, readLimiter, cartController.getId)
cartRouter.put("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, updateLimiter, cartController.update)
cartRouter.delete("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, deleteLimiter, cartController.delete)
