import { sendActivationCodeByEmail } from '@helpers/mailer';
import { v4 as uuidv4 } from 'uuid';

import { ActivationMethod } from '@interfaces/acivate.interface';

import type { IUser } from '@interfaces/user.interface';

class ActivateService {
	private generateActivationCode() {
		return uuidv4();
	}

	async sendActivationCode({user, type}: {user: IUser, type: ActivationMethod}) {
		const code = this.generateActivationCode();

		if (type === ActivationMethod.Email) {
			await sendActivationCodeByEmail(user.email, code);
		}
	}
}

export const activateService = new ActivateService();
