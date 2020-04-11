import { model, Model, Schema } from 'mongoose';
import { ICourse } from '../types';
const ObjectId = Schema.Types.ObjectId;
import { LessonSchema } from './Lesson';
import { FileSchema } from './File';

const CourseSchema: Schema = new Schema(
  {
    createdAt: Date,
    updatedAt: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
    description: String,
    name: String,
    lessons: [LessonSchema],
    files: [FileSchema],
  },
  { timestamps: true, versionKey: false },
)
  .set('autoIndex', false)
  .index({ _id: 1 }, { sparse: true });

export const Course: Model<ICourse> = model<ICourse>('Course', CourseSchema);
