import { Router } from "express";
import { registerRouter } from "../../modules/user/register/router/register.js";
import { roleRouter } from "../../modules/role/router/role.js";

export const routerApiV1 = Router();

routerApiV1.use("/register", registerRouter);
routerApiV1.get('/test', (req, res) => {
  res.json({ message: "¡Router funciona!" });
});
//routerApiV1.use("/auth", registerRouter);
//routerApiV1.use("/cart", registerRouter);
//routerApiV1.use("/cart-item", registerRouter);
//routerApiV1.use("/category", registerRouter);
//routerApiV1.use("/product", registerRouter);
routerApiV1.use("/role", roleRouter);