import { Schema, Types, model } from 'mongoose';
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
	expiresAt: {
		type: Date,
		required: true,
		default: new Date(
			new Date().setDate(
				new Date().getDate() + Number(process.env.SESSION_EXPIRES_DAYS)
			)
		),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const User = model('Session', SessionSchema);
