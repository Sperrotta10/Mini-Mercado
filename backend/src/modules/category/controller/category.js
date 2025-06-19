import { BaseController } from "../../../controller/controller.js"
import { validateCreateCategory } from "../validation/create.js"
import { CategoryModel } from "../model/category.js"

export class CategoryController extends BaseController {

    constructor() {
        super(CategoryModel, {
            create : validateCreateCategory,
            update : validateCreateCategory
        })
    }
}