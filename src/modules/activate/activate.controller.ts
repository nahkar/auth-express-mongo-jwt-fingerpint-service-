import dotenv from 'dotenv';

import { activateService } from './activate.service';

import type { NextFunction, Request, Response } from 'express';

dotenv.config();

class ActivateController {
	async activate(req: Request, res: Response, next: NextFunction) {
		const { code } = req.params;
		try {
			await activateService.activate(code);
			res.redirect(`${process.env.CLIENT_URL ?? ''}/activate-success`);
		} catch (error) {
			next(error);
		}
	}
}

export const activateController = new ActivateController();
