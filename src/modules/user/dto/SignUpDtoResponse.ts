import { IUser } from '@interfaces/user.interface';

export class SignUpDtoResponse {
	id: string;
	email: string;
	constructor(model: IUser) {
		this.id = model._id;
		this.email = model.email;
	}
}
