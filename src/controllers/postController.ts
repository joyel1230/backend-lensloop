import { Request, Response } from "express";
import {
  deletePost,
  fetchPostsData,
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
