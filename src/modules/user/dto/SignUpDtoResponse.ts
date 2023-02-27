import type { IActivate } from '@interfaces/acivate.interface';
import type { IUser } from '@interfaces/user.interface';

export class SignUpDtoResponse {
	id: string;
	email: string;
	phone?: string;
	accessToken: string;
	isActivated: boolean;
	constructor(model: IUser & Pick<IActivate, 'isActivated'> & { accessToken: string }) {
		this.id = model._id.toString();
		this.email = model.email;
		this.phone = model.phone;
		this.accessToken = model.accessToken;
		this.isActivated = model.isActivated;
	}
}
