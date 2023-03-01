import { ProfileRepository } from './profile.repository';

import type { UpdateOrCreateProfileParamsT } from '@interfaces/profile.interface';

export class ProfileService {
	constructor(private profileRepository = new ProfileRepository()) {}
	async getProfile(id: string) {
		const profile = await this.profileRepository.findOneById(id);
		return profile;
	}

	async updateProfile(id: string, updateParams: UpdateOrCreateProfileParamsT) {
		const profile = await this.profileRepository.updateOneById(id, { ...updateParams });
		return profile;
	}
}
