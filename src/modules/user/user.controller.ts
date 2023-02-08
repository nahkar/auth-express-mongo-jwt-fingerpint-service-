import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { validationResult } from 'express-validator';
import { SignUpDtoRequest } from './dto/SignUpDtoRequest';
import httpStatus from 'http-status';
import { ApiError } from '@exceptions/ApiError';

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
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.BadRequest('Validation Error', errors.array()));
			}

			const userAgent = req.headers['user-agent'];

			const user = await userService.signUp({
				...new SignUpDtoRequest(req.body),
				ip: req.ip,
				userAgent,
			});

			res.status(httpStatus.CREATED).json(user);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
