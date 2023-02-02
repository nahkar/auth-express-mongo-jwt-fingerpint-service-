import { User } from '@models/User.model';

import { GetUserDtoResponse } from './dto/GetUserDtoResponse';
import { genSaltSync, hashSync } from 'bcrypt';
import { SignUpDtoResponse } from './dto/SignUpDtoResponse';
import { ApiError } from '@exceptions/ApiError';
import { RegistrationPayloadT } from '@interfaces/types';
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

	async signUp({ email, password, fingerprint, ip }: RegistrationPayloadT) {
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

		const userDtoResponse = new SignUpDtoResponse({
			...user.toObject(),
			accessToken: tokens.accessToken,
		});

		return userDtoResponse;
	}
}

export const userService = new UserService();
