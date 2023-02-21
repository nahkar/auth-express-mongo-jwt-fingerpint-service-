import { IUser } from '@interfaces/user.interface';

export class SignUpDtoRequest {
	email: string;
	password: string;
	fingerprint: string;
	constructor(model: IUser) {
		this.email = model.email;
		this.password = model.password;
		this.fingerprint = model.fingerprint;
	}
}
