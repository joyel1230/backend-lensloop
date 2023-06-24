import { Router } from "express";
import {
  getPosts,
  patchDelete,
  postUpload,
} from "../controllers/postController";
import { verifyAuth } from "../middlewares/auth";

const router: Router = Router();

router.get("/", verifyAuth, getPosts);

router.post("/upload", verifyAuth, postUpload);

router.patch("/delete", verifyAuth, patchDelete);

export default router;
