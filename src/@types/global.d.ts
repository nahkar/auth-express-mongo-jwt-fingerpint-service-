import type * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		id: string;
		email: string;
		fingerprint: string;
	}
}