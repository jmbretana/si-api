import mongoose, { Document, Schema } from 'mongoose';

export interface ISp extends Document {
  sp: number;
  spSeconds: number;
  updatedAt: Date;
}

const spSchema = new Schema<ISp>(
  {
    sp: {
      type: Number,
      required: true,
      default: 100,
    },
    spSeconds: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const SpModel = mongoose.model<ISp>('Sp', spSchema);
