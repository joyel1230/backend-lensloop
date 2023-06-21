import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers as { authorization: string };
    const valid = jwt.verify(authorization, process.env.JWT_KEY);
    if (valid) {
      next();
    } else {
      res.status(401).json({ error: "veriffication failed", valid: false });
    }
  } catch (error) {
    res.status(401).send("not verified");
    console.log(error.message);
  }
};
