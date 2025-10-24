import mongoose, { Document, Schema } from "mongoose";

export interface ISpHistory extends Document {
  uuid: string;
  sp: number;
  spSeconds: number;
  timeStamp: Date;
  createdAt: Date;
}

const spHistorySchema = new Schema<ISpHistory>(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sp: {
      type: Number,
      required: true,
    },
    spSeconds: {
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
  }
);

export const SpHistoryModel = mongoose.model<ISpHistory>(
  "sp-histories",
  spHistorySchema
);
