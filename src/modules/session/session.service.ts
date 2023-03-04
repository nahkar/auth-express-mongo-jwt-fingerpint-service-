import jwt from 'jsonwebtoken';
import { SessionRepository } from '@modules/session/session.repository';

import type { JwtPayload } from 'jsonwebtoken';
import type { CreateSessionT, SearchParamsUpdateOrCreateSessionT, TokenPayloadT, UpdateParamsUpdateOrCreateSessionT } from './types';
import type { Types } from 'mongoose';

class SessionService {
	constructor(private sessionRepository = new SessionRepository()) {}
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
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? '') as JwtPayload;
		} catch (error) {
			return null;
		}
	}

	async createSession(data: CreateSessionT) {
		await this.sessionRepository.create(data);
	}

	async updateOrCreateSession(
		searchParams: SearchParamsUpdateOrCreateSessionT,
		updateParams: UpdateParamsUpdateOrCreateSessionT,
		upsert = true
	) {
		const updated = await this.sessionRepository.updateOne({ userId: searchParams.userId, fingerprint: searchParams.fingerprint }, {
			userId: updateParams.userId,
			refreshToken: updateParams.refreshToken,
			userAgent: updateParams.userAgent,
			fingerprint: updateParams.fingerprint,
			ip: updateParams.ip,
		}, { upsert });

		return updated;
	}

	async getCountOfSessions(userId: Types.ObjectId) {
		const countOfSession = await this.sessionRepository.countDocuments(userId);

		return countOfSession;
	}

	async deleteManySessions(userId: Types.ObjectId) {
		const deleted = await this.sessionRepository.deleteMany(userId);

		return deleted;
	}

	async deleteSession({ fingerprint, refreshToken }: {fingerprint: string, refreshToken:string}) {
		const deleted = await this.sessionRepository.deleteOne({
			fingerprint,
			refreshToken,
		});

		return deleted;
	}

}

export const sessionService = new SessionService();
