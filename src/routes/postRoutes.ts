import { Router } from "express";
import { getPosts } from "../controllers/postController";

const router: Router = Router();


router.get("/",getPosts);






export default router;