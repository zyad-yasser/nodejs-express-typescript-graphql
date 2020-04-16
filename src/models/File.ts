import { model, Model, Schema } from 'mongoose';
import { IFile } from '../types';
const ObjectId = Schema.Types.ObjectId;

export const FileSchema: Schema = new Schema(
  {
    createdAt: Date,
    updatedAt: Date,
    path: String,
    type: String,
    course: {
        type: ObjectId,
        ref: 'Course',
    },
  },
  { timestamps: true, versionKey: false },
)
.set('autoIndex', false)
.index({ _id: 1 }, { sparse: true });

export const File: Model<IFile> = model<IFile>('File', FileSchema);
