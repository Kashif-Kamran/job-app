import { Router, Response, NextFunction } from "express";
import { ProtectedRequest } from "../../types/app-request";
import AsyncHandler from "../../core/AsyncHandler";
import Validator, { ValidationSource } from "../../middlewares/Validator";
import Schema from "./Schema";
import { AuthFailureError } from "../../core/ApiError";
import { validate } from "../../core/JWT";
import UserController from "../user/User.Controller";
const router = Router();

router.use(
  Validator(Schema.accessToken, ValidationSource.HEADER),
  AsyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;
      const accessToken = getAccessToken(authorization);
      let payload = validate(accessToken);
      let user = await UserController.getUserById(payload.sub);
      req.user = user;
      req.accessToken = accessToken;
      return next();
    }
  )
);

function getAccessToken(authorization: string | undefined) {
  if (!authorization)
    throw new AuthFailureError("GetAccessToken: Authorization Not Found: 2");
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("GetAccessToken: Does not start with Bearer: 2");
  let accessToken = authorization.split(" ")[1];
  if (!accessToken)
    throw new AuthFailureError("GetAccssToken: Token Not Found: 3");
  return accessToken;
}

export default router;
