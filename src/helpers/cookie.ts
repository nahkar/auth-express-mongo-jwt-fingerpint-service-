import { DAYS } from '@config/constants';
import dotenv from 'dotenv';

import type { Response } from 'express';

dotenv.config();

export const setTokenCookie = (res: Response, token: string): void => {
	res.cookie('refreshToken', token, {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		maxAge: Number(process.env.SESSION_EXPIRES_DAYS) * DAYS,
	});
};
