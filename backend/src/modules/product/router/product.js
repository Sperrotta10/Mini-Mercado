import { Router } from 'express';
import { ProductController } from "../controller/product.js";
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';

export const productRouter = Router();
const controller = new ProductController();

productRouter.get('/pagination', controller.getPaginatedWithFilters);
productRouter.get('/search/:name', controller.searchByName);
productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.getId);
productRouter.post('/all', authenticateHybrid, authorizeRoles('admin'), controller.createAll); // ruta temporal
productRouter.post('/', authenticateHybrid, authorizeRoles('admin'), controller.create);
productRouter.patch('/:id', authenticateHybrid, authorizeRoles('admin', 'empleado'), controller.update);
productRouter.delete('/:id', authenticateHybrid, authorizeRoles('admin'), controller.delete);

