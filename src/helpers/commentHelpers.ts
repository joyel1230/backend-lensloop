import { Comment } from "../models/comment";


export const saveComment = async (
    postId: string,
    userId: string,
    value: string
  ) => {
    try {
      const newComment=await new Comment({userId:userId,postId:postId,comment:value,date:new Date()}).save()
      const newData=(await Comment.findOne({_id:newComment._id})).populate("userId","username profilePic")
      return newData;
    } catch (error) {
      console.log(error);
    }
  };

export const getAllComments = async (
    postId: string,
  ) => {
    try {
      const newComment=await Comment.find({postId:postId}).populate("userId","username profilePic")
      return newComment;
    } catch (error) {
      console.log(error);
    }
  };