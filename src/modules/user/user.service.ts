import { User } from '@models/User.model';

import { GetUserDtoResponse } from './dto/GetUserDtoResponse';
import { IUser } from '@interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';
import { SignUpDtoResponse } from './dto/SignUpDtoResponse';

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

	async signUp({ email, password }: Pick<IUser, 'email' | 'password'>) {
		try {
			const isUserExist = await User.findOne({ email: email });

			if (isUserExist) {
				throw new Error('User already exist');
			}

			const hashedPassword = this.hashPassword(password);

			const user = await User.create({ email, password: hashedPassword });

			const userDtoResponse = new SignUpDtoResponse(user.toObject());

			return userDtoResponse;
		} catch (error) {
			console.log(error);
		}
	}
}

export const userService = new UserService();
