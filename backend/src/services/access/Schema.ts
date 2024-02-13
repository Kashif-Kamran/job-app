import Joi from "joi";
import { JoiAuthBearer } from "../../middlewares/Validator";

export default {
  register: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(32)
      .regex(/^[a-zA-Z\s]+$/)
      .messages({
        "string.empty": "Name cannot be an empty field",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "string.pattern.base":
          "Name should cannont contain any number and special character",
        "any.required": "Name is a required field",
      }),
    email: Joi.string().email().required().messages({
      "string.base": "Email should be a type of text",
      "string.empty": "Email cannot be an empty field",
      "string.email": "Email should be a valid email",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().required().min(8).max(32).messages({
      "string.empty": "Password cannot be an empty field",
      "string.min": "Password should have a minimum length of {#limit}",
      "string.max": "Password should have a maximum length of {#limit}",
      "any.required": "Password is a required field",
    }),
    role: Joi.string().valid("user", "admin").default("user").messages({
      "string.valid": "Role should be either user or admin",
      "any.required": "Role is a required field",
    }),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": "Email should be valid email",
      "string.required": "Email is Required Feilds",
    }),
    password: Joi.string().required().messages({
      "string.required": "Password Feild Cannot be empty",
      "string.min": "Password should be a minimum length of {#limit}",
      "string.max": "Password should be a maximum length of {#limit}",
    }),
  }),

  accessToken: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required().messages({
        "any.invalid":
          "Invalid Autherization Header: Valid Bearer token required",
        "any.required": "Bearer Token Not provided in Authorization Header",
      }),
    })
    .unknown(true),
};
