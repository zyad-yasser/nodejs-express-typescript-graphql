import { User } from '../models';

export class UserRepository {
  public addToBoughtCourses = async(userId: string, courseId: string): Promise<boolean> => {
    await User.findByIdAndUpdate(userId, { $addToSet: { courses: courseId } });
    return true;
  }
}
