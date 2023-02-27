import { Activate } from '@models/Activate.model';

import type { IActivate } from '@interfaces/acivate.interface';

export class ActivateRepository {
	constructor(private ActivateModel: typeof Activate = Activate) {}

	async create(createParams: Partial<IActivate>) {
		const activated = await this.ActivateModel.create({ ...createParams });
		return activated;
	}

	async findOne(findParams: Partial<IActivate>) {
		const activate = await this.ActivateModel.findOne({ ...findParams });
		return activate;
	}

	async findOneAndUpdate(findParams: Partial<IActivate>, updateParams: Partial<IActivate>) {
		const updated = await this.ActivateModel.findOneAndUpdate(
			{ ...findParams },
			{ ...updateParams, activatedAt: new Date() }
		);
		return updated;
	}
}
