import type { Types } from 'mongoose';

export enum ActivationMethod {
	Email = 'email',
	SMS = 'sms',
}

export interface IActivate {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	isActivated: boolean;
	activationCode: string;
}
