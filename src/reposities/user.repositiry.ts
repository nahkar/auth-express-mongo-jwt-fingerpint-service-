import { User } from '@models/User.model';
import { Types } from 'mongoose';

import type { UserWithSessionsdT } from '@interfaces/types';

export class UserRepository {
	constructor(private UserModel: typeof User = User) {}

	async getUsers() {
		const users = await this.UserModel.find();
		return users;
	}

	async getUserCurrentSession({ userId, fingerprint }: { userId: string; fingerprint: string }) {
		const [user] = await User.aggregate<UserWithSessionsdT | null>([
			{
				$match: { _id: new Types.ObjectId(userId) },
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
				},
			},
		]);

		return user;
	}

	async createUser({ email, phone, hashedPassword }: { email: string; phone?: string; hashedPassword: string }) {
		const user = await User.create({ email, phone, password: hashedPassword });
		return user;
	}

	async getUserByEmail(email: string) {
		const [user] = await User.aggregate<UserWithSessionsdT | null>([
			{
				$match: {
					email,
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
