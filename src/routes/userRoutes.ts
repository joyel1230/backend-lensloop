import { Router } from "express";
import {
  getUsers,
  patchEditPass,
  patchEditProfile,
  postForgotUser,
  postLoginUser,
  postRegisterUser,
} from "../controllers/userController";
import { verifyAuth } from "../middlewares/auth";

const router: Router = Router();

router.get("/", getUsers);

router.post("/register", postRegisterUser);

router.post("/login", postLoginUser);

router.post("/forgot", postForgotUser);

router.patch("/edit-profile/:username", verifyAuth, patchEditProfile);

router.patch("/change-pass/:username", verifyAuth, patchEditPass);

export default router;
