import { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const setTokenCookie = (res: Response, token: string): void => {
	res.cookie('refreshToken', token, {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		maxAge: Number(process.env.SESSION_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
	});
};
