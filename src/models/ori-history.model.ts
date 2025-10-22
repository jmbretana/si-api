import mongoose, { Document, Schema } from 'mongoose';

export interface IOriHistory extends Document {
  uuid: string;
  ori: number;
  oriSeconds: number;
  timeStamp: Date;
  createdAt: Date;
}

const oriHistorySchema = new Schema<IOriHistory>(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ori: {
      type: Number,
      required: true,
    },
    oriSeconds: {
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

export const OriHistoryModel = mongoose.model<IOriHistory>(
  'OriHistory',
  oriHistorySchema,
);
