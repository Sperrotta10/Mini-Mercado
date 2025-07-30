import { Router } from "express"
import { PublicityController } from "../controller/publicity.js";
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"

export const publicityRouter = Router();
const publicityController = new PublicityController();

publicityRouter.post("/", authenticateHybrid, authorizeRoles("admin"), publicityController.create);
publicityRouter.get("/", publicityController.getAll);
publicityRouter.get("/:id", publicityController.getId);
publicityRouter.put("/:id", authenticateHybrid, authorizeRoles("admin"), publicityController.update);
publicityRouter.delete("/:id", authenticateHybrid, authorizeRoles("admin"), publicityController.delete);
