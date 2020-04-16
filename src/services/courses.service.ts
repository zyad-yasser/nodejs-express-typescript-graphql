import { ICourse, ILesson, ISearchCriteria } from '../types';
import { CoursesRepository } from '../repositories/courses.repository';

export class CoursesService {
  private coursesRepository: CoursesRepository = new CoursesRepository();

  public myCourses = async(): Promise<ICourse[]> => {
    return this.coursesRepository.myCourses();
  }

  public getCoursesByCriteria = async(args: ISearchCriteria): Promise<ICourse[]> => {
    const { filters, skip, limit, search, sortType, sortColumn } = args;
    return this.coursesRepository.getCoursesByCriteria({ filters, skip, limit, search, sortType, sortColumn });
  }

  public getLiveLessons = async(): Promise<ILesson[]> => {
    return this.coursesRepository.getLiveLessons();
  }

  public getCourseById = async(id: string): Promise<ICourse> => {
    return this.coursesRepository.getCourseById(id);
  }

  public getCoursesByIds = async(coursedIds: string[]): Promise<ICourse[]> => {
    return this.coursesRepository.getCoursesByIds(coursedIds);
  }
}
