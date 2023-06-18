import { Schema, model } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:'userObjectId',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    maxlength: 30,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "likedUserObjectId",
      },
    ],
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "commentObjectId",
      },
    ],
  },
  deleted:{
    type:Boolean
  }
});

export const Post = model("post", postSchema);
