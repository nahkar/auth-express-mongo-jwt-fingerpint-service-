import { User } from '@models/User.model';

import { GetUserDtoResponse } from './dto/GetUserDtoResponse';
import { genSaltSync, hashSync } from 'bcrypt';
import { ApiError } from '@exceptions/ApiError';
import { SignInPayloadT, SignUpPayloadT } from '@interfaces/types';
import { sessionService } from '@modules/session/session.service';

class UserService {
	constructor() {}

	hashPassword(password: string): string {
		return hashSync(password, genSaltSync(8));
	}

	async getUsers() {
		try {
			const users = await User.find();
			return users.map((user) => new GetUserDtoResponse(user.toObject()));
		} catch (error) {
			console.log(error);
		}
	}

	async signUp({
		email,
		password,
		fingerprint,
		ip,
		userAgent,
	}: SignUpPayloadT) {
		const isUserExist = await User.findOne({ email: email });

		if (isUserExist) {
			throw ApiError.BadRequest(`User with email: ${email} already exists`);
		}

		const hashedPassword = this.hashPassword(password);

		const user = await User.create({ email, password: hashedPassword });

		const tokens = {
			accessToken: sessionService.generateAccessToken({
				id: user.id,
				email: user.email,
			}),
			refreshToken: sessionService.generateRefreshToken({
				id: user.id,
				email: user.email,
			}),
		};

		await sessionService.createSession({
			userId: user.id,
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

	async signIn({ email, password, fingerprint }: SignInPayloadT) {
		const user = await User.findOne({ email: email });

		if (!user) {
			throw ApiError.BadRequest(`Bad credentials`);
		}

		return {};
	}
}

export const userService = new UserService();
