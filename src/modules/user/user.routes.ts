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
		body('fingerprint').isString(),
		userController.signUp
	);

router
	.route('/sign-in')
	.post(
		body('email').isEmail(),
		body('password').isLength({ min: 6 }),
		body('fingerprint').isString(),
		userController.signIn
	);

router.route('/refresh').get(userController.refresh);

router.route('/logout').post(userController.logout);

router.route('/logout-all').post(userController.logoutAll);

export { router as userRouter };
