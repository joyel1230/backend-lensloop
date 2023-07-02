import { Request, Response } from "express";
import {
  deletePost,
  fetchPostsData,
  fetchSavedPostsData,
  fetchSinglePost,
  likePost,
  reportPost,
  savePost,
  uploadPostData,
} from "../helpers/postHelpers";

export const getPosts = async (req: Request, res: Response) => {
  try {
    let { userId } = req.query;
    if (userId === undefined) {
      userId = "";
    }
    const postsData = await fetchPostsData(userId);
    res.status(200).json(postsData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSavedPosts = async (req: Request, res: Response) => {
  try {
    let { userId } = req.query;
    const postsData = await fetchSavedPostsData(userId);
    res.status(200).json(postsData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const postsData = await fetchSinglePost(id);
    res.status(200).json(postsData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postUpload = async (req: Request, res: Response) => {
  try {
    const { userId, image, description } = req.body;
    const data = await uploadPostData(userId, image, description);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchDelete = async (req: Request, res: Response) => {
  try {
    const { postId, value } = req.body;
    const data = await deletePost(postId, value);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchLike = async (req: Request, res: Response) => {
  try {
    const { postId, userId, value } = req.body;
    await likePost(postId, userId, value);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchSavePost = async (req: Request, res: Response) => {
  try {
      const {userId,postId,value} = req.body
      await savePost(postId,userId,value)
      res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postReport = async (req: Request, res: Response) => {
  try {
      const {reporterId,postId,reason} = req.body
      await reportPost(postId,reporterId,reason)
      res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

