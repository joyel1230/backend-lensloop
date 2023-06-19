import { Schema, model } from "mongoose";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  chatUsers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref:'ChatUserObjectId'
      },
    ],
  },
  online: {
    type: Boolean,
  },
  blocked: {
    type: Boolean,
  },
  verified: {
    type: Boolean,
    default:false,
  },
});

export const User = model("user", userSchema);
