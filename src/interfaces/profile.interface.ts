import type { Types } from 'mongoose';

export interface IProfile {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	firstName: string;
	lastName: string;
	organization: string;
	address: string;
	state: string;
	zip: string;
	country: string;
	language: string;
	timezone: string;
	currency: string;
}