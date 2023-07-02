import { Router } from 'express';
import { getAllUsers, getReports, patchUserStatus, postLogin } from '../controllers/adminController';
import { verifyAuth } from '../middlewares/auth';

const router: Router = Router();

router.post('/login',postLogin);

router.get('/users',verifyAuth,getAllUsers);

router.patch('/users/status/:username',verifyAuth,patchUserStatus);

router.get('/posts/reports',verifyAuth,getReports);



export default router;