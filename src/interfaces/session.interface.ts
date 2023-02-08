export interface ISession {
	_id: string;
	userId: string;
	ip: string;
	fingerprint: string;
	refreshToken: string;
	userAgent?: string;
	expiresAt: string;
	createdAt: string;
}
