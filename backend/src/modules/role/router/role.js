import { Router } from 'express';
import { RoleController } from '../controller/role.js';
import { authenticateHybrid } from '../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';
import { getLimiter, modifyLimiter } from '../../../middlewares/rate_limiters/role/role.js';

export const roleRouter = Router();
const controller = new RoleController();

roleRouter.post("/", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.create);
roleRouter.get("/", authenticateHybrid, authorizeRoles('admin'), getLimiter, controller.getAll);
roleRouter.put("/:id", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.update);
roleRouter.delete("/:id", authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.delete);