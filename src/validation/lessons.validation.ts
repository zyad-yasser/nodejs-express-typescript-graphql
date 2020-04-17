import * as Joi from '@hapi/joi';

export const createLessonSchema = Joi.object({
  name: Joi.string().required(),
  duration: Joi.number().optional().allow(null),
  description: Joi.string().required(),
  isLive: Joi.boolean().required(),
  source: Joi.string().required(),
  course: Joi.string().optional(),
  image: Joi.string().optional(),
});

export const lessonsByCourseSchema = Joi.object({
  course: Joi.string().required(),
});

export const lessonLikeSchema = Joi.object({
  lesson: Joi.string().required(),
});
