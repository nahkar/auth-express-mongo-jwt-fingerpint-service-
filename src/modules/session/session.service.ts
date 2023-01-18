import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenPayloadT } from '@interfaces/types';

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
}

export const sessionService = new SessionService();
