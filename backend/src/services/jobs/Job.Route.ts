import { Router, Request, Response } from "express";
import asyncHandler from "../../core/AsyncHandler";
import { ProtectedRequest } from "../../types/app-request";
import Validator from "../../middlewares/Validator";
import schema from "./Schema";
import jobsController from "./Job.Controller";
import { SuccessfullyCreatedResponse } from "../../core/ApiResponse";
let jobRouter = Router();

jobRouter.post(
  "/",
  Validator(schema.postJob),
  asyncHandler(async (req: Request, res: Response) => {
    let creationResponse = await jobsController.createJob(req.body);
    return new SuccessfullyCreatedResponse(
      "Job Created Successfully",
      creationResponse
    ).send(res);
  })
);

export default jobRouter;
