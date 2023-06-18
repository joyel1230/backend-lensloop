import { Request, Response } from "express";
import {
  fetchUsersData,
  loginUsersData,
  registerUsersData,
} from "../helpers/userHelpers";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    const data = await fetchUsersData(username);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postRegisterUser = async (req: Request, res: Response) => {
  const { cred } = req.body;
  const data = await registerUsersData(cred);
  if (data?.status === 200) {
    res.json(data);
  } else {
    res.status(401).json(data);
  }
};

export const postLoginUser = async (req: Request, res: Response) => {
  const {
    credentials,
  }: { credentials: { emailOrUsername: string; password: string } } = req.body;
  const data = await loginUsersData(credentials);
  if (data?.status === 200) {
    res.json(data);
  } else {
    res.status(401).json(data);
  }
};
