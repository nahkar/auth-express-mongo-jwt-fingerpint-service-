export interface ISession {
	_id: string;
	userId: string;
	ip: string;
	fingerprint: string;
	refreshToken: string;
	expiresAt: string;
	createdAt: string;
}
