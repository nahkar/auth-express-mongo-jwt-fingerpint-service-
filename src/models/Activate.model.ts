import { Schema, model } from 'mongoose';

import type{ IActivate } from '@interfaces/acivate.interface';

const AcivateSchema = new Schema({
	isActivated: {
		type: Boolean,
		default: false
	},
	activationCode: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

export const Activate = model<IActivate>('Activate', AcivateSchema )