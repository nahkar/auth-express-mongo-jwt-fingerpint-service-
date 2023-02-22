import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Session } from '@models/Session.model';

import type { CreateSessionT, SearchParamsUpdateOrCreateSessionT, TokenPayloadT, UpdateParamsUpdateOrCreateSessionT } from './types';
import type { Types } from 'mongoose';

dotenv.config();

class SessionService {
	generateAccessToken(payload: TokenPayloadT) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? '', {
			expiresIn: '30s',
		});
	}
	generateRefreshToken(payload: TokenPayloadT) {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? '', {
			expiresIn: `${process.env.SESSION_EXPIRES_DAYS ?? ''}d`,
		});
	}

	generateRefreshAndAccessTokens(payload: TokenPayloadT) {
		return {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(payload),
		};
	}

	validateRefreshToken(token: string) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? '');
		} catch (error) {
			return null;
		}
	}

	async createSession(data: CreateSessionT) {
		await Session.create(data);
	}

	async updateOrCreateSession(
		searchParams: SearchParamsUpdateOrCreateSessionT,
		updateParams: UpdateParamsUpdateOrCreateSessionT,
		upsert = true
	) {
		const updated = await Session.updateOne(
			{ userId: searchParams.userId, fingerprint: searchParams.fingerprint },
			{
				userId: updateParams.userId,
				refreshToken: updateParams.refreshToken,
				userAgent: updateParams.userAgent,
				fingerprint: updateParams.fingerprint,
				ip: updateParams.ip,
			},
			{ upsert }
		);

		return updated;
	}

	async getCountOfSessions(userId: Types.ObjectId) {
		const countOfSession = await Session.countDocuments({
			userId,
		});

		return countOfSession;
	}

	async deleteManySessions(userId: Types.ObjectId) {
		const deleted = await Session.deleteMany({
			userId,
		});

		return deleted;
	}
}

export const sessionService = new SessionService();
