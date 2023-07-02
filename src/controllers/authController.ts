import { Request, Response } from "express";
import { Verify } from "../models/verify";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const authCheck =async (req: Request, res: Response) => {
  const { authorization } = req.headers as { authorization: string };
  const decoded:any= jwt.decode(authorization);
  const data = await User.find({username:decoded?.username})
  res.status(200).json({ valid: true,user:data });
};

export const emailVerifyCheck = async (req: Request, res: Response) => {
  try {
    const { username, token } = req.params;
    const tokenDoc = await Verify.findOne({
      username: username,
      token: token,
    });
    if (!tokenDoc) return res.status(400).send("Invalid link. Please try another link.");
    await User.updateOne({ username }, { $set: { verified: true } });
    return res.status(200).send('Verified. Go to login page...')
  } catch (error) {
    console.log(error?.message);
  }
};
