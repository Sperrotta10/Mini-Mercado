import { Router } from "express"
import { CartItemController } from "../controller/cart_item.js"
import { readLimiter, writeLimiter} from "../../../middlewares/rate_limiters/cart-item/cart_item.js"

export const cartItemRouter = Router();

const cartItemController = new CartItemController();

cartItemRouter.post("/", writeLimiter, cartItemController.create);
cartItemRouter.get("/all/:id", readLimiter, cartItemController.getAll);
cartItemRouter.get("/:id", readLimiter, cartItemController.getId);
cartItemRouter.put("/:id", writeLimiter, cartItemController.update);
cartItemRouter.delete("/:id", writeLimiter, cartItemController.delete);
