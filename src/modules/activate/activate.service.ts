import { sendActivationCodeByEmail } from '@helpers/mailer';
import { v4 as uuidv4 } from 'uuid';
import { ActivationMethod } from '@interfaces/acivate.interface';
// import { Activate } from '@models/Activate.model';
import { ApiError } from '@exceptions/ApiError';
import { sendActivationCodeBySMS } from '@helpers/aws';

import { ActivateRepository } from './activate.repositiry';

import type { IUser } from '@interfaces/user.interface';

export class ActivateService {
	constructor(private activateRepository = new ActivateRepository()) {}

	private generateActivationEmailCode() {
		return uuidv4();
	}

	private generateActivationSMSCode() {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return Math.floor(1000 + Math.random() * 9000).toString();
	}

	async sendActivationCode({ user, type }: { user: IUser; type: ActivationMethod }) {
		let activated;

		if (type === ActivationMethod.SMS && user.phone) {
			const code = this.generateActivationSMSCode();

			activated = await this.activateRepository.create({ code, userId: user._id });
			await sendActivationCodeBySMS({ code, phone: user.phone });
		} else {
			const code = this.generateActivationEmailCode();
			await sendActivationCodeByEmail(user.email, code);
			activated = await this.activateRepository.create({ code, userId: user._id });
		}
		return activated;
	}

	async activate(code: string) {
		const activate = await this.activateRepository.findOne({ code });

		if (!activate) {
			throw ApiError.BadRequest(`Bad confirm code: ${code}`);
		}

		if (activate.isActivated) {
			throw ApiError.BadRequest(`${code} is already activated`);
		}

		await this.activateRepository.findOneAndUpdate({ code }, { isActivated: true });
	}
}

