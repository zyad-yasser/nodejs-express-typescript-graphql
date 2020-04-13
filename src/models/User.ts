import { model, Model, Schema } from 'mongoose';
import { IUser } from '../types';
import { config } from '../config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { ITokens } from '../types/token';
import { IUserModel } from '../types/user';
import { ILogin } from '../types/auth';
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
    courses: [
      {
        type: ObjectId,
        ref: 'Course',
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true, versionKey: false },
)
  .set('autoIndex', false)
  .index({ _id: 1 }, { sparse: true });

UserSchema.methods.generateTokens = async function (authToken?: string, refreshToken?: string): Promise<ITokens> {
  try {
    const _authToken =
      authToken ||
      jwt
        .sign(
          {
            _id: this._id,
            access: 'auth',
          },
          config.authToken.key,
          {
            expiresIn: config.authToken.life,
          },
        )
        .toString();
    const _refreshToken =
      refreshToken ||
      jwt
        .sign(
          {
            _id: this._id,
            access: 'refresh',
          },
          config.refreshToken.key,
          {
            expiresIn: config.refreshToken.life,
          },
        )
        .toString();
    const tokens: ITokens = {
      authToken: { token: `Bearer ${_authToken}`, access: 'auth' },
      refreshToken: { token: `Bearer ${_refreshToken}`, access: 'refresh' },
    };
    this.tokens.push(tokens.authToken, tokens.refreshToken);
    await this.save();
    return tokens;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

UserSchema.statics.findByToken = function (token: string, access: string): Promise<IUser> {
  return this.findOne({
    'tokens.token': token,
    'tokens.access': access,
  });
};

UserSchema.methods.removeToken = function (token: string): Promise<IUser> {
  return this.update({
    $pull: {
      tokens: {
        token,
      },
    },
  });
};

UserSchema.statics.findByEmail = async function (email: string): Promise<void> {
  try {
    const user: IUser = await this.findOne({ email });
    if (user) {
      throw new Error('email already registered');
    }
  } catch (error) {
    throw new Error('error happened');
  }
};

UserSchema.statics.findExistanceById = async function (email: string): Promise<void> {
  try {
    const user: IUser = await this.findOne({ email });
    if (user) {
      throw new Error('email already registered');
    }
  } catch (error) {
    throw new Error('error happened');
  }
};

UserSchema.statics.findByFacebookId = async function (facebookId: string): Promise<void> {
  try {
    const user: IUser = await this.findOne({ facebookId });
    if (user) {
      throw new Error('email already registered');
    }
  } catch (error) {
    throw new Error('error happened');
  }
};

UserSchema.statics.findByCredentials = async function (data: ILogin): Promise<IUser> {
  const { email, password } = data;
  try {
    const user: IUser = await User.findOne({ email });
    if (!user || !user.active) {
      throw new Error('invalid email or password');
    }
    bcrypt.compare(password, user.password, (err, success) => {
      if (err || !success) {
        throw new Error('invalid email or password');
      }
    });
    return user;
  } catch (error) {
    throw new Error('invalid email or password');
  }
};

UserSchema.pre<IUser>('save', function (next: any): any {
  if (this.isModified('password')) {
    return bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hashedPassword) => {
        this.password = hashedPassword;
        next();
      });
    });
  }
  return next();
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  return _.omit(userObject, ['password', 'tokens', '__v']);
};

export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);
