import mongoose, { Document, Schema } from 'mongoose';

export interface IFc extends Document {
  fc: number;
  fcSeconds: number;
  updatedAt: Date;
}

const fcSchema = new Schema<IFc>(
  {
    fc: {
      type: Number,
      required: true,
      default: 100,
    },
    fcSeconds: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const FcModel = mongoose.model<IFc>('Fc', fcSchema);
