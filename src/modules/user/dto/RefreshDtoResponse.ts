import type { IActivate } from '@interfaces/acivate.interface';
import type { IUser } from '@interfaces/user.interface';

export class RefreshDtoResponse {
	accessToken: string;
	email: string;
	id: string;
	phone?: string;
	isActivated: boolean;
	constructor(model: IUser & { accessToken: string }&  Pick<IActivate, 'isActivated'>) {
		this.accessToken = model.accessToken;
		this.id = model._id.toString();
		this.email = model.email;
		this.phone = model.phone;
		this.isActivated = model.isActivated;
	}
}
