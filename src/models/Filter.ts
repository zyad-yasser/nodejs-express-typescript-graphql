import { model, Model, Schema } from 'mongoose';
import { IFilter } from '../types';

export const FilterSchema: Schema = new Schema(
  {
    key: String,
    value: String,
  },
  { timestamps: true, versionKey: false },
)
.set('autoIndex', false)
.index({ _id: 1 }, { sparse: true });

export const Filter: Model<IFilter> = model<IFilter>('Filter', FilterSchema);
