import mongoose, { Document, Schema } from "mongoose";

export interface IOri extends Document {
  id: number;
  ori: number;
  oriSeconds: number;
  timestamp?: Date;
}

const oriSchema = new Schema<IOri>({
  id: {
    type: Number,
    required: true,
  },
  ori: {
    type: Number,
    required: true,
  },
  oriSeconds: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const OriModel = mongoose.model<IOri>("oris", oriSchema);
