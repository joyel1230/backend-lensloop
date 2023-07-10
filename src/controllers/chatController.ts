import { Request, Response } from "express";
import { Chat } from "../models/chat";

export const postChat = async (req: Request, res: Response) => {
  try {
    let { users, msgObj } = req.body;
    const { userId, message } = msgObj;
    users = users.sort();
    await Chat.updateOne(
      { users: [users[0], users[1]] },
      {
        $push: { msgData: { userId, message, date: new Date() } },
        $set: { users: users },
      },
      { upsert: true }
    );
    res.status(200).json({ msg: "changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    let { user1, user2 } = req.query;
    let users = [user1, user2].sort();
    const data = await Chat.findOne({ users: [users[0], users[1]] }).populate(
      "msgData.userId",
      "username"
    );
    res.status(200).json({ chat: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
