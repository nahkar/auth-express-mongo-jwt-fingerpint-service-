import { Router } from 'express';

import { userRouter } from '@modules/user/user.routes';

export const router = Router();

router.use('/auth', userRouter);
