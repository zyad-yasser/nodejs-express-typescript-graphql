import { ICourse, ISearchCriteria, IUser } from '../types';
import { CourseRepository, UserRepository } from '../repositories';
import { Course } from '../models';
import { PaymentService } from './payment.service';

export class CourseService {
  private courseRepository: CourseRepository = new CourseRepository();
  private userRepository: UserRepository = new UserRepository();
  private paymentService: PaymentService = new PaymentService();

  public myCourses = async(): Promise<ICourse[]> => {
    return this.courseRepository.myCourses();
  }

  public getManyByUser = async(id: string): Promise<ICourse[]> => {
    return this.courseRepository.getManyByUser(id);
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
    if (courseData.filters && courseData.filters.length) {
      courseData.filters = courseData.filters.map((filter) => {
        const { value } = filter;
        filter.value = parseFloat(value) ? parseFloat(value) : value;
        return filter;
      });
    }
    const course: ICourse = new Course(courseData);
    return this.courseRepository.create(course);
  }

  public buyCourse = async(courseId: string, userId: string): Promise<boolean> => {
    const course: ICourse = await this.courseRepository.getOneById(courseId);
    const price = Number(course.filters.filter(filter => filter.key === 'price')[0].value);
    const paymentInfo = {};
    const method = {};
    await this.paymentService.proceed(method, price, paymentInfo);
    return this.userRepository.addToBoughtCourses(userId, courseId);
  }
}
