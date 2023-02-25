import { compare, genSaltSync, hashSync } from 'bcrypt';

import { Types } from 'mongoose';

import { User } from '@models/User.model';
import { GetUserDtoResponse } from './dto/GetUserDtoResponse';
import { ApiError } from '@exceptions/ApiError';
import { sessionService } from '@modules/session/session.service';

import { MAX_COUNT_OF_SESSIONS, SALT_COUNT } from '@config/constants';

import type { LogoutPayloadT, RefreshPayloadT, SignInPayloadT, SignUpPayloadT } from './types';
import type { UserWithSessionsdT } from '@interfaces/types';
import { activateService } from '@modules/activate/activate.service';
import { ActivationMethod } from '@interfaces/acivate.interface';

class UserService {
	private hashPassword(password: string): string {
		return hashSync(password, genSaltSync(Number(SALT_COUNT)));
	}

	private async comparePassword(password1: string, password2: string) {
		return await compare(password1, password2);
	}

	private async getUserCurrentSession(userId: string, fingerprint: string) {
		const user = await User.aggregate<UserWithSessionsdT | null>([
			{
				$match: { _id: new Types.ObjectId(userId) },
			},
			{
				$lookup: {
					from: 'sessions',
					localField: '_id',
					foreignField: 'userId',
					as: 'sessions',
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ['$fingerprint', fingerprint] }],
								},
							},
						},
					],
				},
			},
		]);

		return user[0] ?? null;
	}

	async getUsers() {
		try {
			const users = await User.find();
			return users.map((user) => new GetUserDtoResponse(user.toObject()));
		} catch (error) {
			console.log(error);
		}
	}

	async signUp({ email, password, fingerprint, ip, userAgent, phone }: SignUpPayloadT) {
		const isUserExist = await User.findOne({ email: email });

		if (isUserExist) {
			throw ApiError.BadRequest('User with this email is already exists');
		}

		const hashedPassword = this.hashPassword(password);

		const user = await User.create({ email, phone, password: hashedPassword });

		await activateService.sendActivationCode({ user, type: ActivationMethod.SMS });

		const tokens = sessionService.generateRefreshAndAccessTokens({
			id: user._id.toString(),
			email: user.email,
			fingerprint,
		});

		await sessionService.createSession({
			userId: user._id,
			refreshToken: tokens.refreshToken,
			userAgent,
			fingerprint,
			ip,
		});

		return {
			...user.toObject(),
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		};
	}

	async signIn({ email, password, fingerprint, userAgent, ip }: SignInPayloadT) {
		const user = await User.findOne({ email: email });

		if (!user) {
			throw ApiError.BadRequest('Bad credentials');
		}

		const isPasswordEqual = await this.comparePassword(password, user.password);

		if (!isPasswordEqual) {
			throw ApiError.BadRequest('Bad credentials');
		}
		const tokens = sessionService.generateRefreshAndAccessTokens({
			id: user._id.toString(),
			email: user.email,
			fingerprint,
		});

		const countOfSession = await sessionService.getCountOfSessions(user._id);

		if (countOfSession > MAX_COUNT_OF_SESSIONS) {
			await sessionService.deleteManySessions(user._id);
		}

		await sessionService.updateOrCreateSession(
			{ userId: user._id, fingerprint },
			{
				userId: user._id,
				refreshToken: tokens.refreshToken,
				userAgent,
				fingerprint,
				ip,
			}
		);

		return {
			...user.toObject(),
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		};
	}

	async refresh({ refreshToken, ip, userAgent }: RefreshPayloadT) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const payload = sessionService.validateRefreshToken(refreshToken);

		if (!payload) {
			throw ApiError.UnauthorizedError();
		}

		const { id: userId, fingerprint } = payload;

		const user = await this.getUserCurrentSession(userId, fingerprint);

		if (!user) {
			throw ApiError.UnauthorizedError();
		}

		const tokens = sessionService.generateRefreshAndAccessTokens({
			id: userId,
			email: user.email,
			fingerprint,
		});

		await sessionService.updateOrCreateSession(
			{ userId: user._id, fingerprint },
			{
				userId: user._id,
				refreshToken: tokens.refreshToken,
				userAgent,
				fingerprint,
				ip,
			}
		);

		return {
			...user,
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		};
	}

	async logout({ refreshToken }: LogoutPayloadT) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const payload = sessionService.validateRefreshToken(refreshToken);

		if (!payload) {
			throw ApiError.UnauthorizedError();
		}

		const { fingerprint } = payload;

		const deleted = await sessionService.deleteSession({ refreshToken, fingerprint });

		if (!deleted.deletedCount) {
			throw ApiError.BadRequest('You are not logged in');
		}
	}

	async logoutAll({ refreshToken }: LogoutPayloadT) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const payload = sessionService.validateRefreshToken(refreshToken);

		if (!payload) {
			throw ApiError.UnauthorizedError();
		}

		const user = await User.findOne({ email: payload.email });

		if (!user) {
			throw ApiError.UnauthorizedError();
		}

		const deleted = await sessionService.deleteManySessions(user._id);

		if (!deleted.deletedCount) {
			throw ApiError.BadRequest('You are not logged in');
		}
	}
}

export const userService = new UserService();
