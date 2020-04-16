import { ICourse, ISearchCriteria, IUser } from '../types';
import { CourseRepository } from '../repositories';
import { Course } from '../models';

export class CourseService {
  private courseRepository: CourseRepository = new CourseRepository();

  public myCourses = async(): Promise<ICourse[]> => {
    return this.courseRepository.myCourses();
  }

  public getAllByCriteria = async(args: ISearchCriteria): Promise<ICourse[]> => {
    return this.courseRepository.getAllByCriteria(args);
  }

  public getOneById = async(id: string): Promise<ICourse> => {
    return this.courseRepository.getOneById(id);
  }

  public getManyByIds = async(coursedIds: string[]): Promise<ICourse[]> => {
    return this.courseRepository.getManyByIds(coursedIds);
  }

  public create = async(courseData: ICourse, user: IUser): Promise<ICourse> => {
    courseData.user = user._id;
    const course: ICourse = new Course(courseData);
    return this.courseRepository.create(course);
  }
}
