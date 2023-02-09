import { IUser } from '@interfaces/user.interface';

export class SignInDtoResponse {
	id: string;
	email: string;
	accessToken: string;
	constructor(model: IUser & { accessToken: string }) {
		this.id = model._id.toString();
		this.email = model.email;
		this.accessToken = model.accessToken;
	}
}
