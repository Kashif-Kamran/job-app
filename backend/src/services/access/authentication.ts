import { Router, Request, Response } from "express";
import AsyncHandler from "../../core/AsyncHandler";
import Validator, { ValidationSource } from "../../middlewares/Validator";
import Schema from "./Schema";
const router = Router();

router.use(
  Validator(Schema.accessToken, ValidationSource.HEADER),
  AsyncHandler(async (req: Request, res: Response) => {
    res.send("Validation Passed");
  })
);

export default router;
