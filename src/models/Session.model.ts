import { Schema, Types, model } from 'mongoose';
import { getSeesionExpiresDate } from '@helpers/time';

import dotenv from 'dotenv';

dotenv.config();

const SessionSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
		unique: true,
	},
	ip: {
		type: String,
		required: true,
	},
	fingerprint: {
		type: String,
		required: true,
	},
	userAgent: {
		type: String,
	},
	expiresAt: {
		type: Date,
		required: true,
		default: getSeesionExpiresDate(),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

SessionSchema.pre('updateOne', function () {
	void this.set({ createdAt: new Date() });
});

SessionSchema.pre('updateOne', function () {
	void this.set({ expiresAt: getSeesionExpiresDate() });
});

export const Session = model('Session', SessionSchema);
