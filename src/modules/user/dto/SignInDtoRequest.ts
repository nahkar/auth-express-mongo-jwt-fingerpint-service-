import type { ISession } from '@interfaces/session.interface';
import type { IUser } from '@interfaces/user.interface';

export class SignInDtoRequest {
	email: string;
	password: string;
	fingerprint: string;
	phone?: string;
	constructor(model: IUser & Pick<ISession, 'fingerprint' | 'refreshToken'>) {
		this.email = model.email;
		this.phone = model.phone;
		this.password = model.password;
		this.fingerprint = model.fingerprint;
	}
}
