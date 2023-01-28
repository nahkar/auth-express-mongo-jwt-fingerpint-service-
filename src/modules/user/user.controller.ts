import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { validationResult } from 'express-validator';
import { SignUpDtoRequest } from './dto/SignUpDtoRequest';
import httpStatus from 'http-status';

class UserController {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getUsers();
			res.json(users);
		} catch (error) {
			next(error);
		}
	}
	async signUp(req: Request, res: Response, next: NextFunction) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await userService.signUp(new SignUpDtoRequest(req.body));
			res.status(httpStatus.CREATED).json(user);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
