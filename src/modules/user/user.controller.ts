import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { validationResult } from 'express-validator';
import { SignUpDtoRequest } from './dto/SignUpDtoRequest';
import httpStatus from 'http-status';
import { ApiError } from '@exceptions/ApiError';
import { setTokenCookie } from '@helpers/cookie';
import { SignUpDtoResponse } from './dto/SignUpDtoResponse';
import { SignInDtoRequest } from './dto/SignInDtoRequest';

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

			setTokenCookie(res, user.refreshToken);

			res.status(httpStatus.CREATED).json(new SignUpDtoResponse(user));
		} catch (error) {
			next(error);
		}
	}

	async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				next(ApiError.BadRequest('Validation Error', errors.array()));
			}

			const userAgent = req.headers['user-agent'];

			await userService.signIn({
				...new SignInDtoRequest(req.body),
				ip: req.ip,
				userAgent,
			});

			res.status(httpStatus.CREATED).json({});
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
