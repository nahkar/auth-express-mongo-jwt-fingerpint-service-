import { Schema, model } from 'mongoose';

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
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	activatedAt: {
		type: Date,
	},
});

export const Activate = model<IActivate>('Activate', AcivateSchema )