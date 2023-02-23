import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { activateService } from './activate.service';

class ActivateController {
	async activate(req: Request, res: Response, next: NextFunction) {
		const { code } = req.params;

		try {
			await activateService.activate(code);
			res.status(httpStatus.OK).json({ msg: 'You have been activated successfully.' });
		} catch (error) {
			next(error);
		}
	}
}

export const activateController = new ActivateController();
