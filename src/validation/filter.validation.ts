import * as Joi from '@hapi/joi';

export const createFilter = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});
