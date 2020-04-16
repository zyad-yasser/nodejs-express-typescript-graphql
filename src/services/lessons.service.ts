import { ILesson, IUser } from '../types';
import { LessonsRepository } from '../repositories/lessons.repository';
import { Lesson } from '../models';
import { IPaginationParams } from '../types/pagination-params';

export class LessonsService {
  private lessonsRepository: LessonsRepository = new LessonsRepository();

  public getByCourse = async(args: any): Promise<ILesson[]> => {
    const { course } = args;
    return this.lessonsRepository.getByCourse(course);
  }

  public getLive = async(params: IPaginationParams): Promise<ILesson[]> => {
    return this.lessonsRepository.getLive(params);
  }

  public like = async(lessonId: string, user: IUser): Promise<Boolean> => {
    const userId = user._id;
    const lesson = await this.lessonsRepository.like(lessonId, userId);
    if (lesson.likes.includes(userId)) {
      return true;
    }
    return false;
  }

  public dislike = async(lessonId: string, user: IUser): Promise<Boolean> => {
    const userId = user._id;
    const lesson = await this.lessonsRepository.dislike(lessonId, userId);
    if (lesson.dislikes.includes(userId)) {
      return true;
    }
    return false;
  }

  public create = async(lessonData: ILesson, user: IUser): Promise<ILesson> => {
    lessonData.user = user._id;
    const lesson: ILesson = new Lesson(lessonData);
    return this.lessonsRepository.create(lesson);
  }
}
