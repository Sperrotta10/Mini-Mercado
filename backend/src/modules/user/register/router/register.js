import { Router } from 'express';
import { UserRegisterController } from '../controller/register.js';
import { authenticateHybrid } from '../../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../../middlewares/auth/authRole.js'
import { adminGetLimiter, cedulaLimiter, deleteLimiter, getIdLimiter, paginationLimiter, publicRegisterLimiter, updateLimiter } from "../../../../middlewares/rate_limiters/user/register.js";

export const registerRouter = Router();
const controller = new UserRegisterController();

// definicion de rutas para el registro de usuarios
registerRouter.post('/', publicRegisterLimiter, controller.create);
registerRouter.post('/admin-create', authenticateHybrid, authorizeRoles('admin'), controller.createByAdmin);
registerRouter.get('/', authenticateHybrid, authorizeRoles('admin'), adminGetLimiter, controller.getAll);
registerRouter.get('/cedula/:cedula', authenticateHybrid, authorizeRoles('admin', 'empleado'), cedulaLimiter, controller.getCedula);
registerRouter.get('/empleado/pagination', authenticateHybrid, authorizeRoles('admin'), paginationLimiter, controller.getPaginationEmpleado);
registerRouter.get('/:id', authenticateHybrid, authorizeRoles('admin'), getIdLimiter, controller.getId);
registerRouter.patch('/:id', authenticateHybrid, authorizeRoles('admin', 'empleado', 'cliente'), updateLimiter, controller.update);
registerRouter.delete('/:id', authenticateHybrid, authorizeRoles('admin', 'cliente'), deleteLimiter, controller.delete);

