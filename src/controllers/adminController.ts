import { Request, Response } from "express";
import { changeUserVerify, fetchAllUsersData, loginAdminData } from "../helpers/adminHelpers";

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const response = await loginAdminData(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await fetchAllUsersData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchUserStatus = async (req: Request, res: Response) => {
  try {
    const {username} = req.params
    const { status }:{status:{changeKey:string,bool:boolean}} = req.body
    await changeUserVerify(username,status);
    res.status(200).json({msg:'changed'})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};