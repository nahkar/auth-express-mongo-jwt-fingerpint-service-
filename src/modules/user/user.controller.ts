import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import { ApiError } from '@exceptions/ApiError';
import { setTokenCookie } from '@helpers/cookie';

import { SignUpDtoRequest } from './dto/SignUpDtoRequest';
import { UserService } from './user.service';
import { SignUpDtoResponse } from './dto/SignUpDtoResponse';
import { SignInDtoRequest } from './dto/SignInDtoRequest';
import { SignInDtoResponse } from './dto/SignInDtoResponse';
import { RefreshDtoResponse } from './dto/RefreshDtoResponse';

import type { NextFunction, Request, Response } from 'express';

export class UserController {
	constructor(private userService = new UserService()){}
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.userService.getUsers();
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

			const user = await this.userService.signUp({
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

			const user = await this.userService.signIn({
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

			const refreshResponse = await this.userService.refresh({ refreshToken, userAgent, ip: req.ip });

			setTokenCookie(res, refreshResponse.refreshToken);

			res.status(httpStatus.OK).json(new RefreshDtoResponse(refreshResponse));
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			await this.userService.logout({ refreshToken });

			res.clearCookie('refreshToken');

			res.status(httpStatus.OK).json({ msg: 'You have been logged out successfully.' });
		} catch (error) {
			next(error);
		}
	}

	async logoutAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			await this.userService.logoutAll({ refreshToken });

			res.clearCookie('refreshToken');

			res.status(httpStatus.OK).json({ msg: 'You have been logged out from all accounts successfully.' });
		} catch (error) {
			next(error);
		}
	}
}