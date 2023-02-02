import { IUser } from '@interfaces/user.interface';

export class SignUpDtoResponse {
	id: string;
	email: string;
	accessToken: string;
	constructor(model: IUser & { accessToken: string }) {
		this.id = model._id;
		this.email = model.email;
		this.accessToken = model.accessToken;
	}
}
