import type { IUser } from './user.interface';

export type TokenPayloadT = Pick<IUser, 'email'> & { id: string };
