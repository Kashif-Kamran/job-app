import { Router } from "express";
import loginRouter from "./login.route";
import registerRouter from "./Register.Route";
const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
export default router;
