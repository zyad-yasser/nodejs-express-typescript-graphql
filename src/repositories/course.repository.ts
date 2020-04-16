import { ICourse, ILesson, ISearchCriteria, IFilter } from '../types';
import { Course } from '../models/Course';
import { Lesson } from '../models';

export class CourseRepository {

  public myCourses = async(): Promise<ICourse[]> => {
    return Course.find({});
  }

  public create = async(data: ICourse): Promise<ICourse> => {
    return data.save();
  }

  public getOneById = async(_id: string): Promise<ICourse> => {
    return Course.findOne({ _id })
      .populate('user', 'firstName lastName tag');
  }

  public getManyByIds = async(coursesIds: string[]): Promise<ICourse[]> => {
    return Course.find({ _id: { $in: coursesIds } });
  }

  public getAllByCriteria = async(args: ISearchCriteria): Promise<ICourse[]> => {
    const { filters, skip, limit, search, sortType, sortColumn, user }: ISearchCriteria = args;
    const query = { $and: [] };
    const sortParam = sortColumn || 'createdAt';
    const sortDirection = Number(sortType) || 1;

    if (user) {
      query.$and.push(
        {
          user: {
            $ne: user,
          },
        },
      );
    }

    if (search) {
      query.$and.push(
        {
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
        },
      );
    }

    if (filters && Array.isArray(filters)) {
      filters.forEach((filter: IFilter) => {
        // tslint:disable-next-line: prefer-const
        let queryOption = {};
        switch (filter.key) {
          case 'from':
            queryOption['filters.price'] = { $gte: (Number(filter.value) || 0) };
            break;
          case 'to':
            queryOption['filters.price'] = { $lte: (Number(filter.value) || 0) };
            break;
          default:
            queryOption[`filters.${filter.key}`] = filter.value;
            break;
        }
        query.$and.push(queryOption);
      });
    }

    return Course.find(query)
      .sort([[sortParam, sortDirection]])
      .skip(skip)
      .limit(limit);
  }
}
