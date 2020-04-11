import { Document } from 'mongoose';

export interface ICourse extends Document {
  createdAt: Date;
  updatedAt: Date;
  description: string;
  name: string;
  user: string;
  file: string[];
  lessons: string[];
}
