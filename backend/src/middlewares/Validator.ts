import { BadRequestError } from "../core/ApiError";
import { ValidationFailureResponse } from "../core/ApiResponse";
import { Response, Request, NextFunction } from "express";
import Joi from "joi";
export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}
export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source], { abortEarly: false }); // Abort early will check for all conditions
    if (!error) return next();
    const { details } = error;
    const message = details
      .map((i: any) => i.message.replace(/['"]+/g, ""))
      .join(" | ");
    next(new BadRequestError(message));
  };
