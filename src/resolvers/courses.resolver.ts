import { CoursesService } from '../services/courses.service';
import { authorize, validate } from '../middlewares';
import { ICourse } from '../types';
import { allCoursesSchema, getCourseByIdSchema } from '../validation/courses.validation';
const coursesService: CoursesService = new CoursesService();

const courses = async (args, context): Promise<ICourse[]> => {
  try {
    await validate(args, allCoursesSchema);
    const coursesData = await coursesService.getCoursesByCriteria(args);
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
    const coursesData = await coursesService.getCourseById(id);
    return coursesData;
  } catch {
    const { errorName } = context;
    throw new Error(errorName.GENERAL_ERROR);
  }
};

const myCourses = async (args, context): Promise<ICourse[]> => {
  await authorize(context);
  const { courses } = context.auth.user;
  const coursesData = await coursesService.getCoursesByIds(courses);
  return coursesData;
};

export const coursesResolver = {
  courses,
  myCourses,
  courseById,
};
