import { Router } from 'express';
import { ProductController } from "../controller/product.js";
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"

export const productRouter = Router();
const controller = new ProductController();

productRouter.get('/pagination', controller.getPaginatedWithFilters);
productRouter.get('/search/:name', controller.searchByName);
productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.getId);
productRouter.post('/', controller.create);
productRouter.patch('/:id', authenticateHybrid, controller.update);
productRouter.delete('/:id', controller.delete);

