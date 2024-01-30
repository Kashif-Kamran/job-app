import { Response } from "express";
import { ApiError, ErrorType } from "../core/ApiError";
import {
  InternalErrorResponse,
  ValidationFailureResponse,
} from "../core/ApiResponse";
import { environment } from "../config";

export default (error: ApiError, res: Response) => {
  switch (error.type) {
    case ErrorType.BAD_REQUEST:
      return new ValidationFailureResponse(error.message).send(res);
    default:
      if (environment === "development") {
        return new InternalErrorResponse(error.message).send(res);
      } else {
        return new InternalErrorResponse("Something Went Wrong").send(res);
      }
  }
};
