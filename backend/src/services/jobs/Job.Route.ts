import { Router, Request, Response } from "express";
import { ValidationSource } from "../../middlewares/Validator";
import asyncHandler from "../../core/AsyncHandler";
import { ProtectedRequest } from "../../types/app-request";
import Validator from "../../middlewares/Validator";
import schema from "./Schema";
import jobsController from "./Job.Controller";
import {
  SuccessResponse,
  SuccessfullyCreatedResponse,
} from "../../core/ApiResponse";
import authentication from "../../middlewares/authentication";
import { AuthFailureError } from "../../core/ApiError";
import authrization from "../../middlewares/authorization";
let jobRouter = Router();

jobRouter.use(authentication);
// Route to create a new job
jobRouter.post(
  "/",
  Validator(schema.postJob),
  authrization(["admin"]),
  asyncHandler(async (req: ProtectedRequest, res: Response) => {
    let authUser = req.user!;

    let creationResponse = await jobsController.createJobForUser(
      req.body,
      authUser
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
    let authUser = req.user!;
    let jobs = await jobsController.getJobsForUser(authUser);
    return new SuccessResponse("Success", jobs).send(res);
  })
);

jobRouter.get(
  "/:jobId",
  Validator(schema.getJobById, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res: Response) => {
    let authUser = req.user!;
    let job = await jobsController.getUserJobById(req.params.jobId, authUser);
    return new SuccessResponse("Success", job).send(res);
  })
);
export default jobRouter;
