import { Schema, model } from 'mongoose';

import type{ IUser } from '@interfaces/user.interface';

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const User = model<IUser>('User', UserSchema);
