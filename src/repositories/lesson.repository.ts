import { ILesson } from '../types';
import { Lesson } from '../models';
import { IPaginationParams } from '../types/pagination-params';

export class LessonRepository {
  public getLive = async(params: IPaginationParams): Promise<ILesson[]> => {
    const { skip, limit, user } = params;
    const query: any = { course: null, isLive: true };
    if (user) {
      query.user = { $ne: user };
    }
    return Lesson.find(query)
      .populate('user', 'firstName lastName tag')
      .skip(skip)
      .limit(limit);
  }

  public getByCourse = async(course: string): Promise<ILesson[]> => {
    return Lesson.find({ course });
  }

  public like = async(lessonId: string, userId: string): Promise<ILesson> => {
    const lesson = await Lesson.findById(lessonId);
    if (lesson) {
      if (lesson.user === userId) {
        throw new Error('Lesson is yours');
      }
      const likeIndex = lesson.likes.indexOf(userId);
      if (likeIndex < 0) {
        lesson.likes.push(userId);
      } else {
        lesson.likes.splice(likeIndex, 1);
      }
      return lesson.save();
    } else {
      throw new Error('Lesson is not found');
    }
  }

  public dislike = async(lessonId: string, userId: string): Promise<ILesson> => {
    const lesson = await Lesson.findById(lessonId);
    if (lesson) {
      if (lesson.user === userId) {
        throw new Error('Lesson is yours');
      }
      const dislikeIndex = lesson.dislikes.indexOf(userId);
      if (dislikeIndex < 0) {
        lesson.dislikes.push(userId);
      } else {
        lesson.dislikes.splice(dislikeIndex, 1);
      }
      return lesson.save();
    } else {
      throw new Error('Lesson is not found');
    }
  }

  public create = async(newLesson: ILesson): Promise<ILesson> => {
    return newLesson.save();
  }
}
