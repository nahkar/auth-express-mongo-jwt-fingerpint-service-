import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { userService } from './user.service';
import { validationResult } from 'express-validator';
import { SignUpDtoRequest } from './dto/SignUpDtoRequest';
import { ApiError } from '@exceptions/ApiError';
import { setTokenCookie } from '@helpers/cookie';
import { SignUpDtoResponse } from './dto/SignUpDtoResponse';
import { SignInDtoRequest } from './dto/SignInDtoRequest';
import { SignInDtoResponse } from './dto/SignInDtoResponse';
import { RefreshDtoResponse } from './dto/RefreshDtoResponse';

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

			const user = await userService.signIn({
				...new SignInDtoRequest(req.body),
				ip: req.ip,
				userAgent,
			});

			setTokenCookie(res, user.refreshToken);

			res.status(httpStatus.CREATED).json(new SignInDtoResponse(user));
		} catch (error) {
			next(error);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userAgent = req.headers['user-agent'];

			const refreshResponse = await userService.refresh({ refreshToken, userAgent, ip: req.ip });

			setTokenCookie(res, refreshResponse.refreshToken);

			res.status(httpStatus.OK).json(new RefreshDtoResponse(refreshResponse));
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			await userService.logout({ refreshToken });

			res.clearCookie('refreshToken');

			res.status(httpStatus.OK).json({ msg: 'You have been logged out successfully.' });
		} catch (error) {
			next(error);
		}
	}

	async logoutAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			await userService.logoutAll({ refreshToken });

			res.clearCookie('refreshToken');

			res.status(httpStatus.OK).json({ msg: 'You have been logged out from all accounts successfully.' });
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
