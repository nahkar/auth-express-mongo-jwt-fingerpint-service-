import type { IActivate } from '@interfaces/acivate.interface';
import type { IUser } from '@interfaces/user.interface';

export class SignInDtoResponse {
	id: string;
	email: string;
	accessToken: string;
	isActivated: boolean;
	phone?: string;
	constructor(model: IUser & { accessToken: string } &  Pick<IActivate, 'isActivated'>) {
		this.id = model._id.toString();
		this.email = model.email;
		this.phone = model.phone;
		this.accessToken = model.accessToken;
		this.isActivated = model.isActivated;
	}
}
