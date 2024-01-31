import {
  SuccessMessageResponse,
  SuccessResponse,
  SuccessfullyCreatedResponse,
} from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import validator from "../../middlewares/Validator";
import schema from "./Schema";
import AsyncHandler from "../../core/AsyncHandler";
import UserController from "../user/User.Controller";

const registerRouter = Router();

registerRouter.post(
  "/",
  validator(schema.register),
  AsyncHandler(async (req: Request, res: Response) => {
    let result = await UserController.createUser(req.body);
    new SuccessfullyCreatedResponse("User Created Successfully", result).send(
      res
    );
  })
);

export default registerRouter;
