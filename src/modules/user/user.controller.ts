import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

class UserController {
	getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			res.json(userService.getUsers());
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
