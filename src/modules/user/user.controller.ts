import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

class UserController {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getUsers();
			res.json(users);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
