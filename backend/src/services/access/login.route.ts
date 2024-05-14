import { SuccessResponse } from "../../core/ApiResponse";
import { Router, Request, Response } from "express";
import Validator from "../../middlewares/Validator";
import Schema from "./Schema";
import userController from "./../user/User.Controller";
import AsyncHandler from "../../core/AsyncHandler";
import CookieHandler from "../../core/CookieHandler";
const router = Router();

router.post(
  "/",
  Validator(Schema.login),
  AsyncHandler(async (req: Request, res: Response) => {
    // Implement Login controller in user controller
    let userLoginInfo = await userController.loginUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Set token in response cookie
    res = CookieHandler.populateTokenInResponse(userLoginInfo.token, res);
    // Return Response
    new SuccessResponse("Successfully Hit Login Route", userLoginInfo).send(
      res
    );
  })
);

export default router;
