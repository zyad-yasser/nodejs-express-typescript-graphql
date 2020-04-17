import { model, Model, Schema } from 'mongoose';
import { IFilter } from '../types';
const Mixed = Schema.Types.Mixed;

export const FilterSchema: Schema = new Schema(
  {
    key: String,
    value: Mixed,
  },
  { timestamps: true, versionKey: false },
)
.set('autoIndex', false)
.index({ _id: 1 }, { sparse: true });

export const Filter: Model<IFilter> = model<IFilter>('Filter', FilterSchema);
