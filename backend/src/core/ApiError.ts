import {
  ValidationFailureResponse,
  InternalErrorResponse,
  AuthenticationFailureResponse,
  NotFoundResponse,
} from "./ApiResponse";
import { environment } from "../config";
import { Response } from "express";

export enum ErrorType {
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  NOT_FOUND = "NOT_FOUND",
}

/*
 * ApiError is the base class for all custom errors
 */
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
      case ErrorType.AUTHENTICATION_FAILURE:
        return new AuthenticationFailureResponse(error.message).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(error.message).send(res);
      default:
        if (environment === "development") {
          return new InternalErrorResponse(error.message).send(res);
        } else {
          return new InternalErrorResponse("Something Went Wrong").send(res);
        }
    }
  }
}
/*
 * Extend ApiError to create a custom error
 */
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

export class AuthFailureError extends ApiError {
  constructor(message: string = "Authentication Failed") {
    super(ErrorType.AUTHENTICATION_FAILURE, message);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message: string = "Token Expired") {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}
