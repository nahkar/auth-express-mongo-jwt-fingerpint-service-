import { Router } from 'express';
import { userRouter } from '@modules/user/user.routes';
import { activateRouter } from '@modules/activate/activate.routes';

export const router = Router();

router.use('/auth', userRouter);
router.use('/activate', activateRouter);
