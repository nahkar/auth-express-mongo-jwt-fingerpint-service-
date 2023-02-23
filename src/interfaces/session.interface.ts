import type { Types } from 'mongoose';

export interface ISession {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	ip: string;
	fingerprint: string;
	refreshToken: string;
	userAgent?: string;
	expiresAt: string;
	createdAt: string;
}

export interface JwtDataPayload {
	_id: string;
	email: string;
	fingerprint: string;
}