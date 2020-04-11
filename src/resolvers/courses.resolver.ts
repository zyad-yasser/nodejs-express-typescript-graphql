import { CoursesService } from '../services/courses.service';
import { authorize, validate } from '../middlewares';
const coursesService: CoursesService = new CoursesService();

const courses = () => {
  return coursesService.all;
};

const myCourses = async (args, context) => {
  // Authorize
  await authorize(context);

  // Validate
  await validate(args, {});

  // Do your stuff
  return coursesService.myCourses();
};

export const coursesResolver = {
  courses,
  myCourses,
};
