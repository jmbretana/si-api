import mongoose, { Document, Schema } from "mongoose";

export interface IReset extends Document {
  ori?: string;
  fc?: string;
  sp?: string;
  updatedAt: Date;
}

const userSchema = new Schema<IReset>(
  {
    ori: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ResetModel = mongoose.model<IReset>("Reset", userSchema);
