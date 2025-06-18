import { BaseController } from "../../../controller/controller.js";
import { validateCreateRole } from "../validation/create.js";
import { ModelRole } from "../model/role.js";

export class RoleController extends BaseController {

    constructor() {
        super(ModelRole, {
            create : validateCreateRole,
            update : validateCreateRole
        });
    }
}