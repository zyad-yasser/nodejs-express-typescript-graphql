import { Document } from 'mongoose';
import { IToken } from './token';

export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  fileName: String;
  lastName: String;
  mobile: String;
  email: String;
  photo: String;
  facebookId: String;
  password: String;
  tokens: IToken[];
  active: String;
  isAdmin: String;
  isSuperAdmin: String;
}
