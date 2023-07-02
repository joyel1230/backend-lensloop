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
    set: function(value:string) {
      return value.toLowerCase();
    }
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
    default:'https://res.cloudinary.com/dzkyvaivw/image/upload/v1687499812/lensloop/Dp/user_oa7pge.png'
  },
  chatUsers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref:'user'
      },
    ],
    default:[]
  },
  online: {
    type: Boolean,
    default:false
  },
  private: {
    type: Boolean,
    default:false
  },
  blocked: {
    type: Boolean,
    default:false,
  },
  verified: {
    type: Boolean,
    default:false,
  },
});

export const User = model("user", userSchema);
