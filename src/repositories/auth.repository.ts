import { IUser } from '../types';
import { ILogin } from '../types/auth';
import { User } from '../models';

export class AuthRepository {
  public login = async(data: ILogin): Promise<IUser> => {
    return User.findByCredentials(data);
  }

  public checkExistance = async(email: string): Promise<void> => {
    return User.findByEmail(email);
  }

  public checkTagExistance = async(tag: string): Promise<void> => {
    return User.findByTag(tag);
  }

  public getOneById = async(_id: string): Promise<IUser> => {
    return User.findOne({ _id });
  }

  public register = async(user: IUser): Promise<IUser> => {
    return user.save();
  }

  public logout = async(id: string): Promise<boolean> => {
    await User.findByIdAndUpdate(id, { $set: { tokens: [] } });
    return true;
  }
}
