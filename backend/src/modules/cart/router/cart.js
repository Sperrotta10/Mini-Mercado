import { Router } from "express"
import { CartController } from "../controller/cart.js"
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"
import { verifyCartOwnership } from "../../../middlewares/cart_shopping/authCart.js"

export const cartRouter = Router()

const cartController = new CartController()

cartRouter.post("/", authenticateHybrid, authorizeRoles('cliente'), cartController.create)
cartRouter.get("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, cartController.getId)
cartRouter.get("/", authenticateHybrid, authorizeRoles('cliente'), cartController.getAll)
cartRouter.put("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, cartController.update)
cartRouter.delete("/:id", authenticateHybrid, authorizeRoles('cliente'), verifyCartOwnership, cartController.delete)
