import { Router, Request, Response } from 'express';
import { verifyAuth } from '../middlewares/auth';
import { authCheck } from '../controllers/authController';

const router: Router = Router();

router.get('/user',verifyAuth,authCheck);

export default router;
