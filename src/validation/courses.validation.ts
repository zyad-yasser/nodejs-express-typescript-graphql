import * as Joi from '@hapi/joi';

export const allCoursesSchema = Joi.object({
  search: Joi.string()
    .optional(),
  skip: Joi.string()
    .required(),
  limit: Joi.string()
    .required(),
  sortColumn: Joi.string()
    .optional(),
  sortType: Joi.string()
    .optional(),
  filters: Joi
    .array()
    .items(
      Joi.object({
        key: Joi.string()
          .required(),
        value: Joi.string()
        .required(),
      }),
    )
    .optional(),
});

export const createCourseSchema = Joi.object({
  name: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  files: Joi
    .array()
    .items(
      Joi.object({
        path: Joi.string()
          .required(),
        type: Joi.string()
        .required(),
      }),
    )
    .optional(),
  filters: Joi
    .array()
    .items(
      Joi.object({
        key: Joi.string()
          .required(),
        value: Joi.string()
        .required(),
      }),
    )
    .optional(),
});

export const myCoursesSchema = Joi.object({
  skip: Joi.string()
    .required(),
  limit: Joi.string()
    .required(),
});

export const getCourseByIdSchema = Joi.object({
  id: Joi.string()
    .required(),
});

export const getCoursesByIdsSchema = Joi.object({
  courses: Joi
  .array()
  .items(
    Joi.string(),
  )
  .required(),
});
