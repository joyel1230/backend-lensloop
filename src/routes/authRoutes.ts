import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth';
import { authCheck, emailVerifyCheck } from '../controllers/authController';

const router: Router = Router();

router.get('/user',verifyAuth,authCheck);

router.get('/:username/verify/:token',emailVerifyCheck);

export default router;
