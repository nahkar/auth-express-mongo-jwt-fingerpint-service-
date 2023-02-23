import type { IUser } from './user.interface';
import type { ISession } from './session.interface';

export type TokenPayloadT = Pick<IUser, 'email'> & { id: string };

export type UserWithSessionsdT = IUser & { sessions: ISession[] };


