import { sendActivationCodeByEmail } from '@helpers/mailer';
import { v4 as uuidv4 } from 'uuid';

import { ActivationMethod } from '@interfaces/acivate.interface';

import type { IUser } from '@interfaces/user.interface';
import { Activate } from '@models/Activate.model';
import { ApiError } from '@exceptions/ApiError';

class ActivateService {
	private generateActivationCode() {
		return uuidv4();
	}

	async sendActivationCode({ user, type }: { user: IUser; type: ActivationMethod }) {
		const code = this.generateActivationCode();

		if (type === ActivationMethod.Email) {
			await sendActivationCodeByEmail(user.email, code);
			await Activate.create({ code, user: user });
		}
	}

	async activate(code: string) {
		const activate = await Activate.findOne({ code });

		if (!activate) {
			throw ApiError.BadRequest(`Bad confirm code: ${code}`);
		}

		if (activate.isActivated) {
			throw ApiError.BadRequest(`${code} is already activated`);
		}

		await Activate.findOneAndUpdate({ code }, { isActivated: true, activatedAt: new Date() });
	}
}

export const activateService = new ActivateService();
