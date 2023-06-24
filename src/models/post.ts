import { Schema, model } from "mongoose";

const postSchema = new Schema({
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
    default: Date.now(),
  },
  description: {
    type: String,
    maxlength: 100,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    default: [],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Post = model("post", postSchema);
