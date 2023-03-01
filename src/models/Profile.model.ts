import { Schema, Types, model } from 'mongoose';

import type { IProfile } from '@interfaces/profile.interface';

const ProfileSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	organization: {
		type: String,
	},
	address: {
		type: String,
	},
	state: {
		type: String,
	},
	zip: {
		type: String,
	},
	country: {
		type: String,
	},
	language: {
		type: String,
	},
	timezone: {
		type: String,
	},
	currency: {
		type: String,
	},
});

export const Profile = model<IProfile>('Profile', ProfileSchema);