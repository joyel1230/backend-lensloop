import mongoose from "mongoose";
import { Post } from "../models/post";

export const fetchPostsData = async (userId) => {
  try {
    let posts;
    if (userId === "") {
      posts = await Post.find({ deleted: false }).populate(
        "userId",
        "username"
      );
    } else if (userId !== "admin") {
      posts = await Post.find({ userId: userId, deleted: false }).populate(
        "userId",
        "username profilePic"
      );
    } else {
      posts = await Post.find({}).populate("userId", "username email");
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPostData = async (
  userId: string,
  image: string,
  description: string
) => {
  try {
    const newPost = await new Post({
      userId: userId,
      image: image,
      description: description,
    }).save();
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string, value: boolean) => {
  try {
    const newPost = await Post.updateOne(
      { _id: postId },
      { $set: { deleted: value } }
    );
    return newPost;
  } catch (error) {
    console.log(error);
  }
};
