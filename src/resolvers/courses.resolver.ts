import { CoursesService } from '../services/courses.service';
import { authorize, validate } from '../middlewares';
import { ICourse } from '../types';
import { allCoursesSchema, getCourseByIdSchema, createCourseSchema, getCoursesByIdsSchema } from '../validation/courses.validation';
const coursesService: CoursesService = new CoursesService();

const courses = async (args, context): Promise<ICourse[]> => {
  try {
    const isAuthorized = await authorize(context, false);
    // tslint:disable-next-line: prefer-const
    let toSendArgs = args;
    if (isAuthorized) {
      toSendArgs.user = context.auth.user;
    }
    await validate(args, allCoursesSchema);
    const coursesData = await coursesService.getAllByCriteria(toSendArgs);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const courseById = async (args, context): Promise<ICourse> => {
  try {
    await validate(args, getCourseByIdSchema);
    const { id } = args;
    const coursesData = await coursesService.getOneById(id);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const coursesByIds = async (args, context): Promise<ICourse[]> => {
  try {
    await validate(args, getCoursesByIdsSchema);
    const { courses } = args;
    const coursesData = await coursesService.getManyByIds(courses);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const myCourses = async (args, context): Promise<ICourse[]> => {
  try {
    await authorize(context);
    const { courses } = context.auth.user;
    const coursesData = await coursesService.getManyByIds(courses);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const createCourse = async (args, context): Promise<ICourse> => {
  try {
    await authorize(context);
    await validate(args, createCourseSchema);
    const { user } = context.auth;
    const course = await coursesService.create(args, user);
    return course;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const coursesResolver = {
  courses,
  myCourses,
  courseById,
  coursesByIds,
  createCourse,
};
