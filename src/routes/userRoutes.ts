import { Router } from "express";
import {
  getUsers,
  postLoginUser,
  postRegisterUser,
} from "../controllers/userController";

const router: Router = Router();

router.get("/", getUsers);

router.post("/register", postRegisterUser);

router.post("/login", postLoginUser);

export default router;
