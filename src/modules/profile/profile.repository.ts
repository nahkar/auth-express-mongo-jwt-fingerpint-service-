import { Profile } from '@models/Profile.model';

import type { UpdateOrCreateProfileParamsT } from '@interfaces/profile.interface';

export class ProfileRepository {
	constructor(private profileModel = Profile) {}
	async findOneById(id: string) {
		const profile = await this.profileModel.findById(id);
		return profile?.toObject();
	}
	async updateOneById(id: string, updateParams: UpdateOrCreateProfileParamsT, upsert = true) {
		const profile = await this.profileModel.findOneAndUpdate({ _id: id }, { ...updateParams }, { upsert, returnOriginal: false });
		return profile?.toObject();
	}
}
