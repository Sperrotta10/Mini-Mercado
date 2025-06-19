import { Router } from 'express';
import { UserRegisterController } from '../controller/register.js';

export const registerRouter = Router();
const controller = new UserRegisterController();

// definicion de rutas para el registro de usuarios
registerRouter.post('/', controller.create);
registerRouter.get('/', controller.getAll);
registerRouter.get('/cedula/:cedula', controller.getCedula);
registerRouter.get('/:id', controller.getId);
registerRouter.patch('/:id', controller.update);
registerRouter.delete('/:id', controller.delete);

