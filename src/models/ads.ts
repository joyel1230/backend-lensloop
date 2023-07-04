import { Schema, model } from "mongoose";

const adsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    maxlength: 100,
  },
  days: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Ads = model("ads", adsSchema);
