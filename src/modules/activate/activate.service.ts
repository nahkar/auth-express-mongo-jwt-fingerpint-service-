import { sendActivationCodeByEmail } from '@helpers/mailer';
import { v4 as uuidv4 } from 'uuid';

import { ActivationMethod } from '@interfaces/acivate.interface';

import type { IUser } from '@interfaces/user.interface';
import { Activate } from '@models/Activate.model';
import { ApiError } from '@exceptions/ApiError';
import { sendActivationCodeBySMS } from '@helpers/aws';

class ActivateService {
	private generateActivationEmailCode() {
		return uuidv4();
	}

	private generateActivationSMSCode() {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return Math.floor(1000 + Math.random() * 9000).toString();
	}

	async sendActivationCode({ user, type }: { user: IUser; type: ActivationMethod }) {

		if (type === ActivationMethod.Email) {
			const code = this.generateActivationEmailCode();
			await sendActivationCodeByEmail(user.email, code);
			await Activate.create({ code, user: user });
		}

		if(type === ActivationMethod.SMS && user.phone){
			const code = this.generateActivationSMSCode();
			await Activate.create({ code, user: user });
			await sendActivationCodeBySMS({code, phone: user.phone})
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
