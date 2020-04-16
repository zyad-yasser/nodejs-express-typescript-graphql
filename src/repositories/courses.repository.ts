import { ICourse, ILesson, ISearchCriteria } from '../types';
import { Course } from '../models/Course';
import { Lesson } from '../models';

export class CoursesRepository {

  public myCourses = async(): Promise<ICourse[]> => {
    return Course.find({});
  }

  public getLiveLessons = async(): Promise<ILesson[]> => {
    return Lesson.find({ course: null, isLive: true })
      .populate('user', 'firstName lastName tag');
  }

  public getCourseById = async(_id: string): Promise<ICourse> => {
    return Course.findOne({ _id })
      .populate('lesson')
      .populate('user', 'firstName lastName tag');
  }

  public getCoursesByIds = async(coursesIds: string[]): Promise<ICourse[]> => {
    return Course.find({ _id: { $in: coursesIds } });
  }

  public getCoursesByCriteria = async(args: ISearchCriteria): Promise<ICourse[]> => {
    const { filters, skip, limit, search, sortType, sortColumn }: ISearchCriteria = args;
    const query = {};
    return Course.find({
      $or: [{
        name: {
          $regex: search, $options: 'i',
        },
      },
      {
        description: {
          $regex: search, $options: 'i',
        },
      }],
    })
    .skip(skip)
    .limit(limit);
  }
}
