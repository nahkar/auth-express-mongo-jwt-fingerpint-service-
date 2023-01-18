import { ISession } from '@interfaces/session.interface';
import { IUser } from '@interfaces/user.interface';

export class SignUpDtoRequest {
	email: string;
	password: string;
	fingerprint: string;
	constructor(model: IUser & Pick<ISession, 'fingerprint'>) {
		this.email = model.email;
		this.password = model.password;
		this.fingerprint = model.fingerprint;
	}
}
