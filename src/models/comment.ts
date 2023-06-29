import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Comment = model("comment", commentSchema);
