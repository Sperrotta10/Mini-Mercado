import { Router } from 'express';
import { UserRegisterController } from '../controller/register.js';
import { authenticateHybrid } from '../../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../../middlewares/auth/authRole.js'

export const registerRouter = Router();
const controller = new UserRegisterController();

// definicion de rutas para el registro de usuarios
registerRouter.post('/', controller.create);
registerRouter.post('/admin-create', authenticateHybrid, authorizeRoles('admin'), controller.createByAdmin);
registerRouter.get('/', authenticateHybrid, authorizeRoles('admin'), controller.getAll);
registerRouter.get('/cedula/:cedula', authenticateHybrid, authorizeRoles('admin', 'empleado'), controller.getCedula);
registerRouter.get('/empleado/pagination', authenticateHybrid, authorizeRoles('admin'), controller.getPaginationEmpleado);
registerRouter.get('/:id', authenticateHybrid, authorizeRoles('admin'), controller.getId);
registerRouter.patch('/:id', authenticateHybrid, authorizeRoles('admin', 'empleado', 'cliente'), controller.update);
registerRouter.delete('/:id', authenticateHybrid, authorizeRoles('admin', 'cliente'), controller.delete);

