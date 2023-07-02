import mongoose from "mongoose";
import { Post } from "../models/post";
import { Report } from "../models/report";

export const fetchPostsData = async (userId) => {
  try {
    let posts;
    if (userId === "") {
      posts = await Post.find({ deleted: false }).populate(
        "userId",
        "username profilePic"
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

export const fetchSavedPostsData = async (userId) => {
  try {
    const posts = await Post.find({ saved: { $in: [userId] } });
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSinglePost = async (id) => {
  try {
    const post = await Post.find({ _id: id }).populate(
      "userId",
      "username profilePic"
    );
    return post;
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
      date: new Date(),
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

export const likePost = async (
  postId: string,
  userId: string,
  value: boolean
) => {
  try {
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    if (value) {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (
  postId: string,
  userId: string,
  value: boolean
) => {
  try {
    await Post.updateOne({ _id: postId }, { $pull: { saved: userId } });
    if (value) {
      await Post.updateOne({ _id: postId }, { $push: { saved: userId } });
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const reportPost = async (
  postId: string,
  reporterId: string,
  reason: string
) => {
  try {
    const newReport =await new Report({
      reporterId,
      postId,
      reason
    }).save()
    return true;
  } catch (error) {
    console.log(error);
  }
};
