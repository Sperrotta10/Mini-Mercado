import { Router } from 'express';
import { RoleController } from '../controller/role.js';
import { authenticateHybrid } from '../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';

export const roleRouter = Router();
const controller = new RoleController();

roleRouter.get("/", authenticateHybrid, authorizeRoles('admin'), controller.getAll);
roleRouter.post("/", authenticateHybrid, authorizeRoles('admin'), controller.create);
roleRouter.put("/:id", authenticateHybrid, authorizeRoles('admin'), controller.update);
roleRouter.delete("/:id", authenticateHybrid, authorizeRoles('admin'), controller.delete);