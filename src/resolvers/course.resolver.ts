import { CourseService } from '../services';
import { authorize, validate } from '../middlewares';
import { ICourse } from '../types';
import { allCoursesSchema, getCourseByIdSchema, createCourseSchema, getCoursesByIdsSchema } from '../validation/courses.validation';
const courseService: CourseService = new CourseService();

const courses = async ({ input }, context): Promise<ICourse[]> => {
  try {
    const isAuthorized = await authorize(context, false);
    await validate(input, allCoursesSchema);
    // tslint:disable-next-line: prefer-const
    let toSendArgs = input;
    // if (isAuthorized) {
    //   toSendArgs.user = context.auth.user;
    // }
    const coursesData = await courseService.getAllByCriteria(toSendArgs);
    return coursesData;
  } catch (err) {
    console.log(err);
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const courseById = async (args, context): Promise<ICourse> => {
  try {
    await validate(args, getCourseByIdSchema);
    const { id } = args;
    const coursesData = await courseService.getOneById(id);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const coursesByIds = async (args, context): Promise<ICourse[]> => {
  try {
    await validate(args, getCoursesByIdsSchema);
    const { ids } = args;
    const coursesData = await courseService.getManyByIds(ids);
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
    const coursesData = await courseService.getManyByIds(courses);
    return coursesData;
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const publishedCourses = async (args, context): Promise<ICourse[]> => {
  try {
    await authorize(context);
    const { _id } = context.auth.user;
    const coursesData = await courseService.getManyByUser(_id);
    return coursesData;
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const buyCourse = async (args, context): Promise<any> => {
  try {
    await authorize(context);
    const { _id } = context.auth.user;
    const courseId = args.input.course;
    const isBought: boolean = await courseService.buyCourse(courseId, _id);
    return {
      isBought,
    };
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const createCourse = async ({ input }, context): Promise<ICourse> => {
  try {
    await authorize(context);
    await validate(input, createCourseSchema);
    const { user } = context.auth;
    const course = await courseService.create(input, user);
    return course;
  } catch (error) {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

export const courseResolver = {
  courses,
  myCourses,
  courseById,
  coursesByIds,
  createCourse,
  publishedCourses,
  buyCourse,
};
