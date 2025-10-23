import mongoose, { Document, Schema } from "mongoose";

export interface IOri extends Document {
  id: number;
  ori: number;
  seconds: number;
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
  seconds: {
    type: Number,
    required: true,
  },
});

export const OriModel = mongoose.model<IOri>("Ori", oriSchema);
