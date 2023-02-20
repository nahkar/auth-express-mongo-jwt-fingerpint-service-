class UserService {
	constructor() {}

	async getUsers() {
		try {
			return [];
		} catch (error) {
			console.log(error);
		}
	}
}

export const userService = new UserService();
