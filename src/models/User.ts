import { model, Model, Schema } from 'mongoose';
import { IUser } from '../types';
const ObjectId = Schema.Types.ObjectId;

const UserSchema: Schema = new Schema(
  {
    createdAt: Date,
    updatedAt: Date,
    firstName: String,
    lastName: String,
    mobile: String,
    email: {
      type: String,
      unique: true,
    },
    photo: String,
    facebookId: String,
    password: String,
    tokens: {
      type: [
        {
          access: {
            type: String,
            required: true,
          },
          token: {
            type: String,
            required: true,
          },
        },
      ],
      _id: false,
    },
    courses: [{
      type: ObjectId,
      ref: 'Course',
    }],
    active: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
)
  .set('autoIndex', false)
  .index({ _id: 1 }, { sparse: true });

export const User: Model<IUser> = model<IUser>('User', UserSchema);
