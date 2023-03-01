import { Router } from 'express';

import { ProfileController } from './profile.controller';

const profileController = new ProfileController();

export const router = Router();

router.route('/:id').get(profileController.getProfile.bind(profileController));
router.route('/:id').post(profileController.updateProfile.bind(profileController));

export { router as profileRouter };
