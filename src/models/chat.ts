import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const chatSchema = new Schema({
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    required: true,
  },
  msgData: [MessageSchema],
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Chat = model("chat", chatSchema);
