import { DAYS } from '@config/constants';

import type { Response } from 'express';

export const setTokenCookie = (res: Response, token: string): void => {
	res.cookie('refreshToken', token, {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		maxAge: Number(process.env.SESSION_EXPIRES_DAYS) * DAYS,
	});
};

export const removeTokenCookie = (res: Response): void => {
	res.clearCookie('refreshToken', { httpOnly: true,  secure: true, sameSite: 'none' });
};
