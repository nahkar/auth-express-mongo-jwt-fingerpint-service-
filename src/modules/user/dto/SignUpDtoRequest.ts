import { IUser } from '@interfaces/user.interface';

export class SignUpDtoRequest {
	email: string;
	password: string;
	constructor(model: IUser) {
		this.email = model.email;
		this.password = model.password;
	}
}
