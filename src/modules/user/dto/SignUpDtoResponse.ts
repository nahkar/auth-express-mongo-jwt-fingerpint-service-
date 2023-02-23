import type { IUser } from '@interfaces/user.interface';

export class SignUpDtoResponse {
	id: string;
	email: string;
	phone?: string;
	accessToken: string;
	constructor(model: IUser & { accessToken: string }) {
		this.id = model._id.toString();
		this.email = model.email;
		this.phone = model.phone;
		this.accessToken = model.accessToken;
	}
}
