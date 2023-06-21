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
    default:'https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg'
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
    default:false,
  },
  verified: {
    type: Boolean,
    default:false,
  },
});

export const User = model("user", userSchema);
