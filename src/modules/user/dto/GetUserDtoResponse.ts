import { IUser } from '@interfaces/user.interface';

export class GetUserDtoResponse {
	id: string;
	email: string;
	createdAt: string;
	constructor(model: IUser) {
		this.id = model._id.toString();
		this.email = model.email;
		this.createdAt = model.createdAt.toString();
	}
}
