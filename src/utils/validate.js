import Joi from "joi";
import ApiError from "./ApiError.js";

export function validate(schema, payload) {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    stripUnknown: true
  });
  if (error) {
    const msg = error.details.map((d) => d.message.replace(/["]/g, "")).join(", ");
    throw ApiError.badRequest(msg);
  }
  return value;
}

/* Reusable schemas (optional helpers) */
export const schemas = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  aboutUpdate: Joi.object({
    description: Joi.string().max(2000).allow("", null)
  }),
  projectCreate: Joi.object({
    name: Joi.string().max(120).required(),
    url: Joi.string().uri().required()
  }),
  skillCreate: Joi.object({
    title: Joi.string().max(120).required()
  }),
  educationCreate: Joi.object({
    level: Joi.string().max(100).required(),
    institution: Joi.string().max(200).required(),
    year: Joi.number().integer().min(1900).max(3000).required()
  }),
  contactUpdate: Joi.object({
    mobile: Joi.string().allow("", null),
    whatsapp: Joi.string().allow("", null),
    email: Joi.string().email().allow("", null),
    facebook: Joi.string().uri().allow("", null),
    instagram: Joi.string().uri().allow("", null),
    youtube: Joi.string().uri().allow("", null),
    tiktok: Joi.string().uri().allow("", null),
    fbPage: Joi.string().uri().allow("", null)
  }),
  cvUpdate: Joi.object({
    url: Joi.string().uri().required()
  }),
  messageCreate: Joi.object({
    name: Joi.string().max(120).required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(5000).required()
  })
};
