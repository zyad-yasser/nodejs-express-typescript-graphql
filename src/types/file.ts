import { Document } from 'mongoose';

export interface IFile extends Document {
  createdAt: Date;
  updatedAt: Date;
  path: string;
  type: string;
  course: string;
}
