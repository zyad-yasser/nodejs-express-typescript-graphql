import { ILesson, IUser, IPaginationParams } from '../types';
import { LessonRepository } from '../repositories';
import { Lesson } from '../models';

export class LessonService {
  private lessonRepository: LessonRepository = new LessonRepository();

  public getByCourse = async(args: any): Promise<ILesson[]> => {
    const { course } = args;
    return this.lessonRepository.getByCourse(course);
  }

  public getLive = async(params: IPaginationParams): Promise<ILesson[]> => {
    return this.lessonRepository.getLive(params);
  }

  public getOneById = async(lessonId: string): Promise<ILesson> => {
    return this.lessonRepository.getOneById(lessonId);
  }

  public like = async(lessonId: string, user: IUser): Promise<Boolean> => {
    const userId = user._id;
    const lesson = await this.lessonRepository.like(lessonId, userId);
    if (lesson.likes.includes(userId)) {
      return true;
    }
    return false;
  }

  public dislike = async(lessonId: string, user: IUser): Promise<Boolean> => {
    const userId = user._id;
    const lesson = await this.lessonRepository.dislike(lessonId, userId);
    if (lesson.dislikes.includes(userId)) {
      return true;
    }
    return false;
  }

  public create = async(lessonData: ILesson, user: IUser): Promise<ILesson> => {
    lessonData.user = user._id;
    const lesson: ILesson = new Lesson(lessonData);
    return this.lessonRepository.create(lesson);
  }
}
