import mongoose, { Document, Schema } from "mongoose";

export interface IOriHistory extends Document {
  ori: number;
  oriSeconds: number;
  createdAt: Date;
}

const oriHistorySchema = new Schema<IOriHistory>({
  ori: {
    type: Number,
    required: true,
  },
  oriSeconds: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OriHistoryModel = mongoose.model<IOriHistory>(
  "ori-histories",
  oriHistorySchema
);
