import { Router, Request, Response } from "express";
import asyncHandler from "../../core/AsyncHandler";
import { ProtectedRequest } from "../../types/app-request";
import Validator from "../../middlewares/Validator";
import schema from "./Schema";
import jobsController from "./Job.Controller";
import {
  SuccessResponse,
  SuccessfullyCreatedResponse,
} from "../../core/ApiResponse";
import authentication from "../access/authentication";
import { AuthFailureError } from "../../core/ApiError";
let jobRouter = Router();

jobRouter.use(authentication);
// Route to create a new job
jobRouter.post(
  "/",
  Validator(schema.postJob),
  asyncHandler(async (req: ProtectedRequest, res: Response) => {
    if (!req.user) throw new AuthFailureError("User Not Authorized");
    let authUser = req.user;

    let creationResponse = await jobsController.createJobForUser(
      req.body,
      authUser._id
    );

    return new SuccessfullyCreatedResponse(
      "Job Created Successfully",
      creationResponse
    ).send(res);
  })
);
// Get Jobs For Authrized User
jobRouter.get(
  "/",
  asyncHandler(async (req: ProtectedRequest, res: Response) => {
    if (!req.user) throw new AuthFailureError("User Not Authorized");
    let authUser = req.user;
    let jobs = await jobsController.getJobsForUser(authUser._id);
    return new SuccessResponse("Success", jobs).send(res);
  })
);
export default jobRouter;
