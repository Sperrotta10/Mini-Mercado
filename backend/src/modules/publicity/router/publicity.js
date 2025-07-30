import { Router } from "express"
import { PublicityController } from "../controller/publicity.js";
import { authenticateHybrid } from "../../../middlewares/auth/authentificate.js"
import { authorizeRoles } from "../../../middlewares/auth/authRole.js"
import { getLimiter, modifyLimiter } from "../../../middlewares/rate_limiters/publicity/publicity.js";

export const publicityRouter = Router();
const publicityController = new PublicityController();

publicityRouter.post("/", authenticateHybrid, authorizeRoles("admin"), modifyLimiter, publicityController.create);
publicityRouter.get("/", getLimiter, publicityController.getAll);
publicityRouter.get("/:id", getLimiter, publicityController.getId);
publicityRouter.put("/:id", authenticateHybrid, authorizeRoles("admin"), modifyLimiter, publicityController.update);
publicityRouter.delete("/:id", authenticateHybrid, authorizeRoles("admin"), modifyLimiter, publicityController.delete);
