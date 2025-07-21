import { Router } from "express"
import { CartItemController } from "../controller/cart_item.js"
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"

export const cartItemRouter = Router();

const cartItemController = new CartItemController();

cartItemRouter.post("/", authenticateHybrid, authorizeRoles('cliente'), cartItemController.create);
cartItemRouter.get("/all/:id", authenticateHybrid, authorizeRoles('cliente'), cartItemController.getAll);
cartItemRouter.get("/:id", authenticateHybrid, authorizeRoles('cliente'), cartItemController.getId);
cartItemRouter.put("/:id", authenticateHybrid, authorizeRoles('cliente'), cartItemController.update);
cartItemRouter.delete("/:id", authenticateHybrid, authorizeRoles('cliente'), cartItemController.delete);
