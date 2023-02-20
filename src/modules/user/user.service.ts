import { User } from '@models/User.model';

import { GetUserDtoResponse } from './dto/GetUserDtoResponse';

class UserService {
	constructor() {}

	async getUsers() {
		try {
			const users = await User.find();
			return users.map((user) => ({
				...new GetUserDtoResponse(user.toObject()),
			}));
		} catch (error) {
			console.log(error);
		}
	}
}

export const userService = new UserService();
