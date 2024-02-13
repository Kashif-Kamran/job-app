import { Response } from "express";

export enum httpStatusCodes {
  OK = 200,
  CREATED = 201, //✅
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400, //✅
  UNAUTHORIZED = 401, // ✅
  FORBIDDEN = 403,
  NOT_FOUND = 404, //✅
  INTERNAL_SERVER = 500, //✅
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
/*
 * ApiResponse is the base class for all custom responses
 */
abstract class ApiResponse {
  constructor(
    protected httpStatus: httpStatusCodes,
    protected message: string
  ) {}
  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string }
  ) {
    for (const [key, value] of Object.entries(headers)) {
      res.append(key, value);
    }
    // Also will perform sanatization here if needed
    return res.status(this.httpStatus).json(response);
  }
  public send(
    res: Response,
    headers: { [key: string]: string } = {}
  ): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }
}

// Success Responses
export class SuccessMessageResponse extends ApiResponse {
  constructor(message: string) {
    super(httpStatusCodes.OK, message);
  }
}

export class SuccessfullyCreatedResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(httpStatusCodes.CREATED, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(httpStatusCodes.OK, message);
  }
}

// Failure Responses
export class ValidationFailureResponse extends ApiResponse {
  constructor(message: string) {
    super(httpStatusCodes.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message: string) {
    super(httpStatusCodes.INTERNAL_SERVER, message);
  }
}

export class AuthenticationFailureResponse extends ApiResponse {
  constructor(message: string = "Authentication Failed") {
    super(httpStatusCodes.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message: string = "Not Found") {
    super(httpStatusCodes.NOT_FOUND, message);
  }
}
