import * as Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});
