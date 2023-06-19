import { Router } from "express";
import {
  getUsers,
  postForgotUser,
  postLoginUser,
  postRegisterUser,
} from "../controllers/userController";

const router: Router = Router();

router.get("/", getUsers);

router.post("/register", postRegisterUser);

router.post("/login", postLoginUser);

router.post("/forgot", postForgotUser);

export default router;
