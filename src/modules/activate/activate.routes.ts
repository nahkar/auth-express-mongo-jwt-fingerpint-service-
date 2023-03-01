import { Router } from 'express';

import { ActivateController } from './activate.controller';

const activateController = new ActivateController();

export const router = Router();

router.route('/:code').get(activateController.activate.bind(activateController));

export { router as activateRouter };
