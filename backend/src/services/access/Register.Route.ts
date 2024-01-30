import { SuccessMessageResponse } from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import validator from "../../middlewares/Validator";
import schema from "./Schema";
import AsyncHandler from "../../core/AsyncHandler";
import registerUser from "./Register.Controller";

const registerRouter = Router();

registerRouter.post(
  "/",
  validator(schema.register),
  AsyncHandler(async (req: Request, res: Response) => {
    console.log("✅  Register Route has been hit");
    // await registerUser(req.body);
    new SuccessMessageResponse("User Created Successfully").send(res);
  })
);

export default registerRouter;
