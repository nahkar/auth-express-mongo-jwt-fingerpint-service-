import { Router } from 'express';
import { body } from 'express-validator';

import { userController } from './user.controller';

export const userRouter = Router();

userRouter.get('/user', userController.getUsers);
userRouter.post(
	'/sign-up',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	userController.signUp
);
