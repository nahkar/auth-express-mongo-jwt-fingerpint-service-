import { Router } from 'express';

import { ProfileController } from './profile.controller';

const profileController = new ProfileController();

export const router = Router();

router.route('/:id').get(profileController.getProfile.bind(profileController));

export { router as profileRouter };
