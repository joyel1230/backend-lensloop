import { Schema, model } from "mongoose";

const reportSchema = new Schema({
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

export const Report = model("report", reportSchema);
