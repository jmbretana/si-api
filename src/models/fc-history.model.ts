import mongoose, { Document, Schema } from 'mongoose';

export interface IFcHistory extends Document {
  uuid: string;
  fc: number;
  fcSeconds: number;
  timeStamp: Date;
  createdAt: Date;
}

const fcHistorySchema = new Schema<IFcHistory>(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fc: {
      type: Number,
      required: true,
    },
    fcSeconds: {
      type: Number,
      required: true,
    },
    timeStamp: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const FcHistoryModel = mongoose.model<IFcHistory>(
  'FcHistory',
  fcHistorySchema,
);
