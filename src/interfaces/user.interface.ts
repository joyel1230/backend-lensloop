import { Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    chatUsers?: ObjectId[];
    name?: string;
    profilePic?: string;
    online?: boolean;
    blocked?: boolean;
    verified?:boolean;
}