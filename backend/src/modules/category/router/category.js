import { Router } from 'express';
import { CategoryController } from '../controller/category.js';
import { authenticateHybrid } from '../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';

export const categoriaRouter = Router();
const controller = new CategoryController();

categoriaRouter.get("/", controller.getAll);
categoriaRouter.get("/:id", controller.getId);
categoriaRouter.post("/", authenticateHybrid, authorizeRoles('admin'), controller.create);
categoriaRouter.patch("/:id", authenticateHybrid, authorizeRoles('admin'), controller.update);
categoriaRouter.delete("/:id", authenticateHybrid, authorizeRoles('admin'), controller.delete);