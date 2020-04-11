import * as Joi from '@hapi/joi';

export const myCourses = Joi.object({
  number: Joi.string()
    .required()
    .min(7)
    .max(100),
});
