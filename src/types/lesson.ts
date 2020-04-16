import { Document } from 'mongoose';

export interface ILesson extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  duration: number;
  likes: string[];
  dislikes: string[];
  slug: string;
  description: string;
  source: string;
  course: string;
  isLive: boolean;
  user: string;
}
