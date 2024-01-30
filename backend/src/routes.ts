import accessRouter from "./services/access";
import { Router } from "express";

const routes = Router();

routes.use("/access", accessRouter);

export default routes;
