import { Request, Response } from "express";
import {
  changePrivate,
  editUserPass,
  editUserProfile,
  fetchUsersData,
  loginUsersData,
  manageFollowers,
  manageFollowing,
  registerUsersData,
  updatePass,
} from "../helpers/userHelpers";
import { User } from "../models/user";
import { Follow } from "../models/follow";

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
  try {
    const { cred } = req.body;
    const data = await registerUsersData(cred);
    if (data?.status === 200) {
      res.json(data);
    } else {
      res.status(401).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const postLoginUser = async (req: Request, res: Response) => {
  try {
    const {
      credentials,
    }: { credentials: { emailOrUsername: string; password: string } } =
      req.body;
    const data = await loginUsersData(credentials);
    if (data?.status === 200) {
      res.json(data);
    } else {
      res.status(401).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const postForgotUser = async (req: Request, res: Response) => {
  try {
    const { email, newPass } = req.body;
    const response = await updatePass(email, newPass);
    if (response.stat) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const patchEditProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { newName, newUsername, newDpUrl } = req.body;
    const userToken = await editUserProfile(
      username,
      newName,
      newUsername,
      newDpUrl
    );
    res.status(200).json({ msg: "changed", token: userToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchEditPass = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { newPass } = req.body;
    await editUserPass(username, newPass);
    res.status(200).json({ msg: "changed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchPrivate = async (req: Request, res: Response) => {
  try {
    const { username, value } = req.body;
    await changePrivate(username, value);
    res.status(200).json({ msg: "changed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postFollowers = async (req: Request, res: Response) => {
  try {
    const { userId, followerId, value } = req.body;
    await manageFollowers(userId, followerId, value);
    res.status(200).json({ msg: "changed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postFollowing = async (req: Request, res: Response) => {
  try {
    const { userId, followerId, value } = req.body;
    await manageFollowing(userId, followerId, value);
    res.status(200).json({ msg: "changed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollow = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const data = await Follow.find({ _id: userId });
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
