import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CreateSessionT, TokenPayloadT } from '@interfaces/types';
import { Session } from '@models/Session.model';

dotenv.config();

class SessionService {
	generateAccessToken(payload: TokenPayloadT) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
			expiresIn: '30s',
		});
	}
	generateRefreshToken(payload: TokenPayloadT) {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {
			expiresIn: `${process.env.SESSION_EXPIRES_DAYS}d`,
		});
	}

	async createSession(data: CreateSessionT) {
		await Session.create(data);
	}
}

export const sessionService = new SessionService();
