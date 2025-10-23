import mongoose, { Document, Schema } from "mongoose";

export interface IFc extends Document {
  id: string;
  fc: number;
  fcSeconds: number;
  updatedAt: Date;
}

const fcSchema = new Schema<IFc>({
  id: {
    type: String,
    required: true,
  },
  fc: {
    type: Number,
    required: true,
  },
  fcSeconds: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const FcModel = mongoose.model<IFc>("Fc", fcSchema);
