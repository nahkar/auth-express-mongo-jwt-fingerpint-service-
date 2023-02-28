import { Router } from 'express';
import { body } from 'express-validator';

import { UserController } from './user.controller';

export const router = Router();

const userController = new UserController();

router.route('/user').get(userController.getUsers.bind(userController));

router
	.route('/sign-up')
	.post(
		body('email').isEmail(),
		body('password').isLength({ min: 6 }),
		body('fingerprint').isString(),
		userController.signUp.bind(userController)
	);

router
	.route('/sign-in')
	.post(
		body('email').isEmail(),
		body('password').isLength({ min: 6 }),
		body('fingerprint').isString(),
		userController.signIn.bind(userController)
	);

router.route('/refresh').get(userController.refresh.bind(userController));

router.route('/logout').post(userController.logout.bind(userController));

router.route('/logout-all').post(userController.logoutAll.bind(userController));

export { router as userRouter };
