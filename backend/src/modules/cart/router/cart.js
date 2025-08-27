import { Router } from "express"
import { CartController } from "../controller/cart.js"
import { verifyCartOwnership } from "../../../middlewares/cart_shopping/authCart.js"
import { createLimiter, deleteLimiter, readLimiter, updateLimiter } from "../../../middlewares/rate_limiters/cart/cart.js"

export const cartRouter = Router()

const cartController = new CartController()

cartRouter.post("/", createLimiter, cartController.create)
cartRouter.get("/", readLimiter, cartController.getAll)
cartRouter.get("/:id", verifyCartOwnership, readLimiter, cartController.getId)
cartRouter.put("/:id", verifyCartOwnership, updateLimiter, cartController.update)
cartRouter.delete("/:id", verifyCartOwnership, deleteLimiter, cartController.delete)
