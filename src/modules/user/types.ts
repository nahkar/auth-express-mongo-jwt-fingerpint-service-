import type { ISession } from '@interfaces/session.interface';
import type { IUser } from '@interfaces/user.interface';

export type SignUpPayloadT = Pick<IUser, 'email' | 'password'> & Pick<ISession, 'ip' | 'fingerprint' | 'userAgent'>;

export type SignInPayloadT = Pick<IUser, 'email' | 'password'> & Pick<ISession, 'ip' | 'fingerprint' | 'userAgent'>;
