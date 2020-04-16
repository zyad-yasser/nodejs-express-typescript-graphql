import * as Joi from '@hapi/joi';

export const paginationSchema = Joi.object({
  skip: Joi.string().required(),
  limit: Joi.string().required(),
});
