import { ProfileRepository } from './profile.repository';

export class ProfileService {
	constructor(private profileRepository: ProfileRepository = new ProfileRepository()) {}
	async getProfile(id: string) {
		const profile = await this.profileRepository.findOneById(id);
		return profile;
	}
}
