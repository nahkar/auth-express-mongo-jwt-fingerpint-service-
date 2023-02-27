import { Schema, Types, model } from 'mongoose';

import type{ IActivate } from '@interfaces/acivate.interface';

const AcivateSchema = new Schema({
	isActivated: {
		type: Boolean,
		default: false
	},
	code: {
		type: String,
		required: true
	},
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		require: true
	},
	activatedAt: {
		type: Date,
	},
});

export const Activate = model<IActivate>('Activate', AcivateSchema );