import { Router } from 'express';
import { UserRegisterController } from '../controller/register.js';
import { authenticateHybrid } from '../../../../middlewares/auth/authentificate.js';
import { authorizeRoles } from '../../../../middlewares/auth/authRole.js'

export const registerRouter = Router();
const controller = new UserRegisterController();

// definicion de rutas para el registro de usuarios
registerRouter.post('/', authenticateHybrid, authorizeRoles('admin', 'cliente'), controller.create);
registerRouter.get('/', controller.getAll);
registerRouter.get('/cedula/:cedula', controller.getCedula);
registerRouter.get('/empleado/pagination', controller.getPaginationEmpleado);
registerRouter.get('/:id', controller.getId);
registerRouter.patch('/:id', controller.update);
registerRouter.delete('/:id', controller.delete);

