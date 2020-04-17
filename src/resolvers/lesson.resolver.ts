import { LessonService } from '../services';
import { ILesson } from '../types';
import { createLessonSchema, lessonsByCourseSchema, lessonLikeSchema } from '../validation/lessons.validation';
import { validate, authorize } from '../middlewares';
const lessonService: LessonService = new LessonService();

const liveLessons = async (args, context): Promise<ILesson[]> => {
  try {
    const isAuthorized = await authorize(context, false);
    // tslint:disable-next-line: prefer-const
    let toSendArgs = args;
    // This part is for make sute not to get your own data
    // if (isAuthorized) {
    //   toSendArgs.user = context.auth.user;
    // }
    const lessons = await lessonService.getLive(toSendArgs);
    return lessons;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const lessonsByCourse = async (args, context): Promise<ILesson[]> => {
  try {
    await validate(args, lessonsByCourseSchema);
    const lessons = await lessonService.getByCourse(args);
    return lessons;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const createLesson = async ({ input }, context): Promise<ILesson> => {
  try {
    await authorize(context);
    await validate(input, createLessonSchema);
    const { user } = context.auth;
    const lesson = await lessonService.create(input, user);
    return lesson;
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const like = async (args, context): Promise<any> => {
  try {
    await authorize(context);
    await validate(args, lessonLikeSchema);
    const { user } = context.auth;
    const { lesson } = args;
    const isLiked = await lessonService.like(lesson, user);
    return {
      isLiked,
    };
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const lesson = async ({ id }, context): Promise<ILesson> => {
  try {
    await authorize(context);
    return lessonService.getOneById(id);
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const dislike = async (args, context): Promise<any> => {
  try {
    await authorize(context);
    await validate(args, lessonLikeSchema);
    const { user } = context.auth;
    const { lesson } = args;
    const isDisliked = await lessonService.dislike(lesson, user);
    return {
      isDisliked,
    };
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const lessonResolver = {
  lesson,
  like,
  dislike,
  liveLessons,
  createLesson,
  lessonsByCourse,
};
