import { ISession } from './session.interface';
import { IUser } from './user.interface';

export type RegistrationPayloadT = Pick<IUser, 'email' | 'password'> &
	Pick<ISession, 'ip' | 'fingerprint'>;

export type TokenPayloadT = Pick<IUser, 'email'> & { id: String };
