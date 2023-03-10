import HTTPStatus from 'http-status';

export class ApiError extends Error {
	status;
	errors;

	constructor(status: number, message: string, errors: unknown[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError() {
		return new ApiError(HTTPStatus.UNAUTHORIZED, 'User is not authorized');
	}

	static BadRequest(message: string, errors: unknown[] = []) {
		return new ApiError(HTTPStatus.BAD_REQUEST, message, errors);
	}
}
