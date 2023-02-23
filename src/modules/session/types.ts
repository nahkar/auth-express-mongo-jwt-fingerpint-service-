import type { ISession } from '@interfaces/session.interface';
import type { IUser } from '@interfaces/user.interface';

export type SearchParamsUpdateOrCreateSessionT = Pick<ISession, 'userId' | 'fingerprint'>;
export type UpdateParamsUpdateOrCreateSessionT = Pick<
ISession,
'userId' | 'refreshToken' | 'userAgent' | 'fingerprint' | 'ip'
>;

export type CreateSessionT = Pick<ISession, 'refreshToken' | 'ip' | 'fingerprint' | 'userId' | 'userAgent'>;

export type TokenPayloadT = Pick<IUser, 'email'> & Pick<ISession, 'fingerprint'> & { id: string };
