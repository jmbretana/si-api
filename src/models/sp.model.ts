import mongoose, { Document, Schema } from "mongoose";

export interface ISp extends Document {
  id: number;
  sp: number;
  spSeconds: number;
  updatedAt: Date;
}

const spSchema = new Schema<ISp>({
  id: {
    type: Number,
    required: true,
  },
  sp: {
    type: Number,
    required: true,
  },
  spSeconds: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const SpModel = mongoose.model<ISp>("Sp", spSchema);
