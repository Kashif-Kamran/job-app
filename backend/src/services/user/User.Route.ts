import { Request, Response, Router } from "express";
import Validator, { ValidationSource } from "../../middlewares/Validator";
import Schema from "../access/Schema";
import AsyncHandler from "../../core/AsyncHandler";
import authentication from "../access/authentication";
const router = Router();

router.use(authentication);
router.get(
  "/my-profile",
  AsyncHandler(async (req: Request, res: Response) => {
    res.send("Able To Access My Profile");
  })
);

export default router;
