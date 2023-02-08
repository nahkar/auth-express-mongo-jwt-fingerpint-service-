import { ISession } from './session.interface';
import { IUser } from './user.interface';

export type RegistrationPayloadT = Pick<IUser, 'email' | 'password'> &
	Pick<ISession, 'ip' | 'fingerprint' | 'userAgent'>;

export type TokenPayloadT = Pick<IUser, 'email'> & { id: String };

export type CreateSessionT = Pick<
	ISession,
	'refreshToken' | 'ip' | 'fingerprint' | 'userId' | 'userAgent'
>;
