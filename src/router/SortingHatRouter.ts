import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { StudentService } from '../service/StudentService';
import { StudentRepository } from '../repository/StudentRepository';

import SortingHatController from '../controller/SortingHatController';

import { validationMiddleware, greetingHatSchema } from '../middleware/validation';

const sortingHatController = new SortingHatController(new StudentService(new StudentRepository(new PrismaClient())));

const router: Router = express.Router();

router.post('/sort', sortingHatController.sortStudents);

export default router;
