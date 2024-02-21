import Joi from "joi";
import { JoiMongooseObjectId } from "../../middlewares/Validator";
export default {
  postJob: Joi.object().keys({
    title: Joi.string().required().messages({
      "string.empty": "Title cannot be an empty field",
      "any.required": "Title is a required field",
    }),

    salary: Joi.number().required().messages({
      "number.empty": "Salary cannot be an empty field",
      "any.required": "Salary is a required field",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description cannot be an empty field",
      "any.required": "Description is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email cannot be an empty field",
      "any.required": "Email is a required field",
      "string.email": "Email must be a valid email",
    }),
    address: Joi.string().required().messages({
      "string.empty": "Address cannot be an empty field",
      "any.required": "Address is a required field",
    }),
    companyName: Joi.string().required().messages({
      "string.empty": "Company Name cannot be an empty field",
      "any.required": "Company Name is a required field",
    }),
    industry: Joi.string().required().messages({
      "string.empty": "Industry cannot be an empty field",
      "any.required": "Industry is a required field",
    }),
    jobType: Joi.string().required().messages({
      "string.empty": "Job Type cannot be an empty field",
      "any.required": "Job Type is a required field",
    }),
    minEducation: Joi.string().required().messages({
      "string.empty": "Minimum Education cannot be an empty field",
      "any.required": "Minimum Education is a required field",
    }),
    experience: Joi.string().required().messages({
      "string.empty": "Experience cannot be an empty field",
      "any.required": "Experience is a required field",
    }),
    positions: Joi.number().required().messages({
      "string.empty": "Positions cannot be an empty field",
      "any.required": "Positions is a required field",
    }),
    lastDate: Joi.date().messages({
      "date.base": "Last Date must be a valid date formate",
    }),
  }),
  getJobById: Joi.object().keys({
    jobId: Joi.string().required().messages({
      "string.empty": "Job Id cannot be an empty param",
      "any.required": "Job Id is a required field",
    }),
  }),
};
