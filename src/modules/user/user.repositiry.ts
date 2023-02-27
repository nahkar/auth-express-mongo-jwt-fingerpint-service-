import { User } from '@models/User.model';
import { Types } from 'mongoose';

import type { IUser } from '@interfaces/user.interface';
import type { UserWithSessionsdT } from '@interfaces/types';

export class UserRepository {
	constructor(private UserModel: typeof User = User) {}

	async find() {
		const users = await this.UserModel.find();
		return users;
	}

	async findByIdUserWithSessions({ userId, fingerprint }: { userId: string; fingerprint: string }) {
		const [user] = await this.UserModel.aggregate<UserWithSessionsdT | null>([
			{
				$match: { _id: new Types.ObjectId(userId) },
			},
			{
				$lookup: {
					from: 'activates',
					localField: '_id',
					foreignField: 'userId',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$set: {
					isActivated: '$result.isActivated',
				},
			},
			{
				$project: {
					result: 0,
				},
			},
			{
				$lookup: {
					from: 'sessions',
					localField: '_id',
					foreignField: 'userId',
					as: 'sessions',
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ['$fingerprint', fingerprint] }],
								},
							},
						},
					],
				}
			},
		]);

		return user;
	}

	async create(createParams: Partial<IUser>) {
		const user = await this.UserModel.create({ ...createParams });
		return user;
	}

	async findOne(findParams: Partial<IUser>) {
		const [user] = await this.UserModel.aggregate<UserWithSessionsdT | null>([
			{
				$match: {
					...findParams
				},
			},
			{
				$lookup: {
					from: 'activates',
					localField: '_id',
					foreignField: 'userId',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$set: {
					isActivated: '$result.isActivated',
				},
			},
			{
				$project: {
					result: 0,
				},
			},
		]);
		return user;
	}
}
