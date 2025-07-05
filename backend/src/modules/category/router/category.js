import { Router } from 'express';
import { CategoryController } from '../controller/category.js';

export const categoriaRouter = Router();
const controller = new CategoryController();

categoriaRouter.get("/", controller.getAll);
categoriaRouter.post("/", controller.create);
categoriaRouter.patch("/:id", controller.update);
categoriaRouter.delete("/:id", controller.delete);