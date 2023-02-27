import type { IUser } from '@interfaces/user.interface';

export class RefreshDtoResponse {
	accessToken: string;
	email: string;
	id: string;
	phone?: string;
	constructor(model: IUser & { accessToken: string }) {
		this.accessToken = model.accessToken;
		this.id = model._id.toString();
		this.email = model.email;
		this.phone = model.phone;
	}
}
