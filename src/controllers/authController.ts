import { Request, Response } from "express";

export const authCheck = (req: Request, res: Response) => {
  res.status(200).json({ valid: true });
};
