import { Router } from "express";
import {
  getFollow,
  getUsers,
  patchEditPass,
  patchEditProfile,
  patchPrivate,
  postFollowers,
  postFollowing,
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

router.patch("/private", verifyAuth, patchPrivate);

router.post("/followers", verifyAuth, postFollowers);

router.post("/following", verifyAuth, postFollowing);

router.get("/follow", verifyAuth, getFollow);

export default router;
