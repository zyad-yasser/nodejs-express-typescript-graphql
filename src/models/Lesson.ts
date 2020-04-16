import { model, Model, Schema } from 'mongoose';
import { ILesson } from '../types';
const ObjectId = Schema.Types.ObjectId;

export const LessonSchema: Schema = new Schema(
  {
    createdAt: Date,
    updatedAt: Date,
    name: String,
    duration: String,
    likes: [String],
    dislikes: [String],
    slug: String,
    description: String,
    order: Number,
    source: String,
    course: {
      type: ObjectId,
      ref: 'Course',
      default: null,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    isLive: Boolean,
  },
  { timestamps: true, versionKey: false },
)
  .set('autoIndex', false)
  .index({ _id: 1 }, { sparse: true });

export const Lesson: Model<ILesson> = model<ILesson>('Lesson', LessonSchema);
