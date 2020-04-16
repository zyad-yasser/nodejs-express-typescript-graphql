import * as Joi from '@hapi/joi';

export const filesByCourseSchema = Joi.object({
  skip: Joi.string().required(),
  limit: Joi.string().required(),
  course: Joi.string().required(),
});

export const addFileToCourseSchema = Joi.object({
  type: Joi.string().required(),
  path: Joi.string().required(),
  course: Joi.string().required(),
});
