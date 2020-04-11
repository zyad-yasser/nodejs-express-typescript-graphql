import { Document } from 'mongoose';

export interface IToken extends Document {
  access: string;
  token: string;
}
