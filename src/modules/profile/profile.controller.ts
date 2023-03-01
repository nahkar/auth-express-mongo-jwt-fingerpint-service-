import httpStatus from 'http-status';
import { ApiError } from '@exceptions/ApiError';

import { UpdateProfileDtoRequest } from './dto/UpdateProfileDtoRequest';
import { ProfileDtoResponse } from './dto/ProfileDtoResponse';
import { ProfileService } from './profile.service';

import type { NextFunction, Request, Response } from 'express';

export class ProfileController {
	constructor(private profileRepository = new ProfileService()) {}

	async getProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const profile = await this.profileRepository.getProfile(req.params.id);
			if (!profile) {
				return next(ApiError.BadRequest('User not found'));
			}
			res.json(new ProfileDtoResponse(profile));
		} catch (error) {
			next(error);
		}
	}

	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const profile = await this.profileRepository.updateProfile(req.params.id, new UpdateProfileDtoRequest({ ...req.body, userId: req.params.id }));
			if (!profile) {
				return next(ApiError.BadRequest('User not found'));
			}

			res.status(httpStatus.CREATED).json(new ProfileDtoResponse(profile));
		} catch (error) {
			next(error);
		}
	}
}
