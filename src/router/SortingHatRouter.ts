import express, { Router } from 'express';
import DIContainer from 'src/di';

import { validationMiddleware, sortingHatSchema } from '../middleware/validation';

const router: Router = express.Router();

const sortingHatController = DIContainer.sortingHatController;

router.post('/sort', validationMiddleware(sortingHatSchema), sortingHatController.sortStudents.bind(sortingHatController));

export default router;
