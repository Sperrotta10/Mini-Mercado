import { Router } from 'express';
import { CategoryController } from '../controller/category.js';
import { authenticateHybrid } from '../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';
import { getLimiter, modifyLimiter } from '../../../middlewares/rate_limiters/category/category.js';

export const categoriaRouter = Router();
const controller = new CategoryController();

categoriaRouter.post("/", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.create);
categoriaRouter.get("/", getLimiter, controller.getAll);
categoriaRouter.get("/:id", getLimiter, controller.getId);
categoriaRouter.patch("/:id", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.update);
categoriaRouter.delete("/:id", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.delete);