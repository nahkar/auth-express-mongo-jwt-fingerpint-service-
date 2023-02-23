/* eslint-disable @typescript-eslint/no-magic-numbers */
export const SALT_COUNT = 8;
export const MAX_COUNT_OF_SESSIONS = 3;
export const SERVER_PORT = 3060;

export const time: Record<string, number> = {
	seconds: 1000,
	minutes: 60 * 1000,
	hours: 60 * 60 * 1000,
	days: 24 * 60 * 60 * 1000,
} as const;

export const DAYS = time.days;
