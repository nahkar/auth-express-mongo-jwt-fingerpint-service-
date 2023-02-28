import { Profile } from '@models/Profile.model';

export class ProfileRepository {
	constructor(private profileModel: typeof Profile = Profile) {}
	async findOneById(id: string) {
		console.log(this.profileModel);
		return Promise.resolve({ id });
	}
}
