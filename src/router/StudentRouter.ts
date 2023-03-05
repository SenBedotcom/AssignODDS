import express, { Router } from 'express';
import DIContainer from 'src/di';

const router: Router = express.Router();

const studentController = DIContainer.studentController;

router.get('/', studentController.getStudents.bind(studentController));
router.get('/:studentId', studentController.getStudent.bind(studentController));

export default router;
