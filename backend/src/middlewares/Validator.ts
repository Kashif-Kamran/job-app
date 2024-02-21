import { BadRequestError } from "../core/ApiError";
import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import Joi from "joi";
export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export const JoiAuthBearer = () => {
  return Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith("Bearer ")) return helpers.error("any.invalid");
    if (!value.split(" ")[1]) return helpers.error("any.invalid");
    return value;
  }, "Authorization Header Validation");
};

export const JoiMongooseObjectId = () => {
  return Joi.string().custom((value: string, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      return helpers.error("any.invalid");
    return value;
  }, "Object Id Validation");
};

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
