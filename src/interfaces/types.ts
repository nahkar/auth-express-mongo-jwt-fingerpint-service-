import type { IUser } from './user.interface';
import type { ISession } from './session.interface';
import type { IActivate } from './acivate.interface';

export type TokenPayloadT = Pick<IUser, 'email'> & { id: string };

export type UserWithSessionsdT = IUser & Pick<IActivate, 'isActivated'> & { sessions: ISession[] };

