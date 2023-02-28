import { Router } from 'express';
import { userRouter } from '@modules/user/user.routes';
import { activateRouter } from '@modules/activate/activate.routes';
import { profileRouter } from '@modules/profile/profile.rotes';

export const router = Router();

router.use('/auth', userRouter);
router.use('/activate', activateRouter);
router.use('/profile', profileRouter);
