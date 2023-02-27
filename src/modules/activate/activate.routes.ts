import { Router } from 'express';

import { activateController } from './activate.controller';

export const router = Router();

router.route('/:code').get(activateController.activate);

export { router as activateRouter };
