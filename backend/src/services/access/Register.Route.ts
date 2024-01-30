import { SuccessMessageResponse } from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import validator from "../../middlewares/Validator";
import schema from "./Schema";
import AsyncHandler from "../../core/AsyncHandler";
const registerRouter = Router();

registerRouter.post(
  "/",
  validator(schema.register),
  AsyncHandler(async (req: Request, res: Response) => {
    console.log("Verified Request Body for Registration :", req.body);
    new SuccessMessageResponse("Successfully Hit Register Route").send(res);
  })
);

export default registerRouter;
