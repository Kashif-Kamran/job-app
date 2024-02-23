import { Request, Response, Router } from "express";
import AsyncHandler from "../../core/AsyncHandler";
import authentication from "../../middlewares/authentication";
import { ProtectedRequest } from "../../types/app-request";
import UserController from "./User.Controller";
import { NotFoundError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
const router = Router();

router.use(authentication);
router.get(
  "/my-profile",
  AsyncHandler(async (req: ProtectedRequest, res: Response) => {
    if (!req.user) throw new NotFoundError("User Not Found");
    let user = await UserController.getUserById(req.user._id);
    return new SuccessResponse("User Info Retrived Successfully", user).send(
      res
    );
  })
);

export default router;
