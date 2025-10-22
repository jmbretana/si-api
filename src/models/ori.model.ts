import mongoose, { Document, Schema } from 'mongoose';

export interface IOri extends Document {
  ori: number;
  oriSeconds: number;
  updatedAt: Date;
}

const oriSchema = new Schema<IOri>(
  {
    ori: {
      type: Number,
      required: true,
      default: 0,
    },
    oriSeconds: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const OriModel = mongoose.model<IOri>('Ori', oriSchema);
