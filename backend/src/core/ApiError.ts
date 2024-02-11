import {
  ValidationFailureResponse,
  InternalErrorResponse,
  AuthenticationFailureResponse,
} from "./ApiResponse";
import { environment } from "../config";
import { Response } from "express";
export enum ErrorType {
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
}

//
export abstract class ApiError extends Error {
  public type: ErrorType;
  public message: string;

  constructor(type: ErrorType, message: string) {
    super(type);
    this.type = type;
    this.message = message;
  }
  static handle(error: ApiError, res: Response) {
    switch (error.type) {
      case ErrorType.BAD_REQUEST:
        return new ValidationFailureResponse(error.message).send(res);
      case ErrorType.TOKEN_EXPIRED:
        return new AuthenticationFailureResponse(error.message).send(res);
      default:
        if (environment === "development") {
          return new InternalErrorResponse(error.message).send(res);
        } else {
          return new InternalErrorResponse("Something Went Wrong").send(res);
        }
    }
  }
}

//
export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(ErrorType.INTERNAL_SERVER_ERROR, message);
  }
}
