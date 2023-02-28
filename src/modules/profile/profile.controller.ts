import { ProfileService } from './profile.service';

import type { NextFunction, Request, Response } from 'express';

export class ProfileController {
	constructor(private profileRepository = new ProfileService()) {}

	async getProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const profile = await this.profileRepository.getProfile(req.params.id);
			res.json(profile);
		} catch (error) {
			next(error);
		}
	}
}

