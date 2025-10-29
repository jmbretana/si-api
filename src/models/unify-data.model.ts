import mongoose, { Document, Schema } from "mongoose";

export interface IUnify extends Document {
  ori?: number;
  oriSeconds?: number;
  ori_timestamp?: Date;
  sp?: number;
  spSeconds?: number;
  sp_timestamp?: Date;
  fc?: number;
  fcSeconds?: number;
  fc_timestamp?: Date;
}

const unifySchema = new Schema<IUnify>({
  id: {
    type: Number,
  },
  ori: {
    type: Number,
  },
  oriSeconds: {
    type: Number,
  },
  ori_timestamp: {
    type: Date,
    default: Date.now,
  },
  sp: {
    type: Number,
  },
  spSeconds: {
    type: Number,
  },
  sp_timestamp: {
    type: Date,
  },
  fc: {
    type: Number,
  },
  fcSeconds: {
    type: Number,
  },
  fc_timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Forzar el nombre exacto de la colección
export const UnifyModel = mongoose.model<IUnify>("unifyData", unifySchema, "unifyDatas");
