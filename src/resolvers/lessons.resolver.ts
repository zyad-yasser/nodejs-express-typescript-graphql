import { LessonsService } from '../services';
import { ILesson } from '../types';
import { createLessonSchema, lessonsByCourseSchema, lessonLikeSchema } from '../validation/lessons.validation';
import { validate, authorize } from '../middlewares';
const lessonsService: LessonsService = new LessonsService();

const liveLessons = async (args, context): Promise<ILesson[]> => {
  try {
    const isAuthorized = await authorize(context, false);
    // tslint:disable-next-line: prefer-const
    let toSendArgs = args;
    if (isAuthorized) {
      toSendArgs.user = context.auth.user;
    }
    const lessons = await lessonsService.getLive(toSendArgs);
    return lessons;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const lessonsByCourse = async (args, context): Promise<ILesson[]> => {
  try {
    await validate(args, lessonsByCourseSchema);
    const lessons = await lessonsService.getByCourse(args);
    return lessons;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const createLesson = async (args, context): Promise<ILesson> => {
  try {
    await authorize(context);
    await validate(args, createLessonSchema);
    const { user } = context.auth;
    const lesson = await lessonsService.create(args, user);
    return lesson;
  } catch {
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
    const isLiked = await lessonsService.like(lesson, user);
    return {
      isLiked,
    };
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
    const isDisliked = await lessonsService.dislike(lesson, user);
    return {
      isDisliked,
    };
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const coursesResolver = {
  like,
  dislike,
  liveLessons,
  createLesson,
  lessonsByCourse,
};
