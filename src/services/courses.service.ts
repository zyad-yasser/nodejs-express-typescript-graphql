import { ICourse } from '../types';
import { CoursesRepository } from '../repositories/courses.repository';

export class CoursesService {
  private coursesRepository: CoursesRepository = new CoursesRepository();

  public all = async(): Promise<ICourse[]> => {
    return this.coursesRepository.all();
  }

  public myCourses = async(): Promise<ICourse[]> => {
    return this.coursesRepository.myCourses();
  }
}
