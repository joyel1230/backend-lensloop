import { Request, Response } from "express";
import { fetchPostsData } from "../helpers/postHelpers";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const data = await fetchPostsData();
    res.status(200).json(data);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
