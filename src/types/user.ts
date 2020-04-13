import { Document, Model } from 'mongoose';
import { IToken, ITokens } from './token';
import { ILogin } from './auth';

export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  fileName: string;
  lastName: string;
  mobile: string;
  email: string;
  photo: string;
  facebookId: string;
  password: string;
  tokens: IToken[];
  active: string;
  role: string;
  removeToken(): Promise<IUser>;
  generateTokens(): Promise<ITokens>;
}

export interface IUserModel extends Model<IUser> {
  findByToken(): Promise<IUser>;
  findByEmail(email: string): Promise<void>;
  findByFacebookId(): Promise<void>;
  findByCredentials(data: ILogin): Promise<IUser>;
}
