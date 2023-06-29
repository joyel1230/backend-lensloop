import { Request, Response } from "express";
import { getAllComments, saveComment } from "../helpers/commentHelpers";

export const postComment = async (req: Request, res: Response) => {
  try {
    const { userId, postId, value } = req.body;
    const newComment = await saveComment(postId, userId, value);
    res.status(200).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const comments = await getAllComments(id);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
