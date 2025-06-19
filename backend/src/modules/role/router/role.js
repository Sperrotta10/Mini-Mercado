import { Router } from 'express';
import { RoleController } from '../controller/role.js';

export const roleRouter = Router();
const controller = new RoleController();

roleRouter.get("/", controller.getAll);
roleRouter.post("/", controller.create);
roleRouter.put("/:id", controller.update);
roleRouter.delete("/:id", controller.delete);