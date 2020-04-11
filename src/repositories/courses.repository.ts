import { ICourse } from '../types';
import { Course } from '../models/Course';

export class CoursesRepository {
  public all = async(): Promise<ICourse[]> => {
    return Course.find();
  }

  public myCourses = async(): Promise<ICourse[]> => {
    return Course.find({});
  }
}
