import dotenv from 'dotenv';

dotenv.config();

export const getSeesionExpiresDate = () =>
	new Date(new Date().setDate(new Date().getDate() + Number(process.env.SESSION_EXPIRES_DAYS)));
