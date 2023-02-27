import { Session } from '@models/Session.model';

import type { Types } from 'mongoose';
import type { ISession } from '@interfaces/session.interface';
import type { CreateSessionT } from '@modules/session/types';

export class SessionRepository {
	constructor(private SessionModel: typeof Session = Session) {}

	async create(createParams: CreateSessionT) {
		const session = await this.SessionModel.create({ ...createParams });
		return session;
	}

	async updateOne(
		findParams: { userId: Types.ObjectId; fingerprint: string },
		updateParams: Partial<ISession>,
		params: { upsert: boolean }
	) {
		const updated = await Session.updateOne(
			{ ...findParams },
			{
				...updateParams,
			},
			{ ...params }
		);

		return updated;
	}

	async countDocuments(userId: Types.ObjectId) {
		const count = await this.SessionModel.countDocuments({
			userId,
		});

		return count;
	}

	async deleteMany(params: Partial<ISession>) {
		const deleted = await this.SessionModel.deleteMany({
			...params,
		});

		return deleted;
	}

	async deleteOne(params: Partial<ISession>) {
		const deleted = await this.SessionModel.deleteOne({
			...params,
		});

		return deleted;
	}
}
