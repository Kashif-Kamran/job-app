import accessRouter from "./services/access";
import userRouter from "./services/user/User.Route";
import { Router } from "express";
import jobsRouter from "./services/jobs/Job.Route";

const routes = Router();

routes.use("/access", accessRouter);
routes.use("/user", userRouter);
routes.use("/jobs", jobsRouter);

export default routes;
