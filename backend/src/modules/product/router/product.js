import { Router } from 'express';
import { ProductController } from "../controller/product.js";
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from '../../../middlewares/auth/authRole.js';
import { getListLimiter, modifyLimiter } from '../../../middlewares/rate_limiters/product/product.js';

export const productRouter = Router();
const controller = new ProductController();

productRouter.post('/all', authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.createAll); // ruta temporal
productRouter.post('/', authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.create);
productRouter.get('/pagination', getListLimiter, controller.getPaginatedWithFilters);
productRouter.get('/search/:name', getListLimiter, controller.searchByName);
productRouter.get('/', getListLimiter, controller.getAll);
productRouter.get('/:id', getListLimiter, controller.getId);
productRouter.patch('/:id', authenticateHybrid, authorizeRoles('admin', 'empleado'), modifyLimiter, controller.update);
productRouter.delete('/:id', authenticateHybrid, authorizeRoles('admin'), modifyLimiter, controller.delete);

