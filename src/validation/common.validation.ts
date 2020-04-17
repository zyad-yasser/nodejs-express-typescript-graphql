import * as Joi from '@hapi/joi';

export const paginationSchema = Joi.object({
  skip: Joi.number().required(),
  limit: Joi.number().required(),
});
