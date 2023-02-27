import { Schema, Types, model } from 'mongoose';
import dotenv from 'dotenv';
import { getSeesionExpiresDate } from '@helpers/time';

import type { ISession } from '@interfaces/session.interface';

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

export const Session = model<ISession>('Session', SessionSchema);
