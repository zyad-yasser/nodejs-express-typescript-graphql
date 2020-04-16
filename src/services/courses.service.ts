import { ICourse, ILesson, ISearchCriteria, IUser } from '../types';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../models';

export class CoursesService {
  private coursesRepository: CoursesRepository = new CoursesRepository();

  public myCourses = async(): Promise<ICourse[]> => {
    return this.coursesRepository.myCourses();
  }

  public getAllByCriteria = async(args: ISearchCriteria): Promise<ICourse[]> => {
    return this.coursesRepository.getAllByCriteria(args);
  }

  public getOneById = async(id: string): Promise<ICourse> => {
    return this.coursesRepository.getOneById(id);
  }

  public getManyByIds = async(coursedIds: string[]): Promise<ICourse[]> => {
    return this.coursesRepository.getManyByIds(coursedIds);
  }

  public create = async(courseData: ICourse, user: IUser): Promise<ICourse> => {
    courseData.user = user._id;
    const course: ICourse = new Course(courseData);
    return this.coursesRepository.create(course);
  }
}
