import { Router } from "express";
import {
  getPostById,
  getPosts,
  getSavedPosts,
  patchDelete,
  patchLike,
  patchSavePost,
  postUpload,
} from "../controllers/postController";
import { verifyAuth } from "../middlewares/auth";
import { getComment, postComment } from "../controllers/commentController";

const router: Router = Router();

router.get("/", verifyAuth, getPosts);

router.get("/save", verifyAuth, getSavedPosts);

router.get("/:id", verifyAuth, getPostById);

router.post("/upload", verifyAuth, postUpload);

router.patch("/delete", verifyAuth, patchDelete);

router.patch("/like", verifyAuth, patchLike);

router.patch("/save",verifyAuth,patchSavePost)

router.post("/comment",verifyAuth,postComment)

router.get("/comment/:id",verifyAuth,getComment)

export default router;
