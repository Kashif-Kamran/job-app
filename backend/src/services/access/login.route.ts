import {
  SuccessMessageResponse,
  SuccessResponse,
} from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import Validator from "../../middlewares/Validator";
import Schema from "./Schema";
import userController from "./../user/User.Controller";
import AsyncHandler from "../../core/AsyncHandler";
const router = Router();

router.get(
  "/",
  Validator(Schema.login),
  AsyncHandler(async (req: Request, res: Response) => {
    // Implement Login controller in user controller
    let userLoginInfo = await userController.loginUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Return Response
    new SuccessResponse("Successfully Hit Login Route", userLoginInfo).send(
      res
    );
  })
);

export default router;
