import accessRouter from "./services/access";
import userRouter from "./services/user/User.Route";
import { Request, Router, Response } from "express";

const routes = Router();

routes.use("/access", accessRouter);
routes.use("/user", userRouter);
export default routes;
