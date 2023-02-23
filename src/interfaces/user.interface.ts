import type{ Types } from 'mongoose';

export interface IUser {
	_id: Types.ObjectId;
	email: string;
	phone?: string;
	password: string;
	createdAt: string;
}
