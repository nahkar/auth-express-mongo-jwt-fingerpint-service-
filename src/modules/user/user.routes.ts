import { Router } from 'express';
import { body } from 'express-validator';

import { userController } from './user.controller';

export const router = Router();

router.route('/user').get(userController.getUsers);

router
	.route('/sign-up')
	.post(
		body('email').isEmail(),
		body('password').isLength({ min: 6 }),
		userController.signUp
	);

export { router as userRouter };
