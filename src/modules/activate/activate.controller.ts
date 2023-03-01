import dotenv from 'dotenv';

import { ActivateService } from './activate.service';

import type { NextFunction, Request, Response } from 'express';

dotenv.config();

export class ActivateController {
	constructor(private activateService = new ActivateService()) {}
	async activate(req: Request, res: Response, next: NextFunction) {
		const { code } = req.params;
		try {
			await this.activateService.activate(code);
			res.redirect(`${process.env.CLIENT_URL ?? ''}/activate-success`);
		} catch (error) {
			next(error);
		}
	}
}

