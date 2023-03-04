import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import sortingHatRouter from './router/SortingHatRouter';

import config from './config';

import { PrismaClient } from '@prisma/client';
import { StudentService } from './service/StudentService';
import { StudentRepository } from './repository/StudentRepository';

import SortingHatController from './controller/SortingHatController';

import { validationMiddleware, greetingHatSchema } from './middleware/validation';

const prisma = new PrismaClient();
const studentRepository = new StudentRepository(prisma);
const studentService = new StudentService(studentRepository);

const app: Express = express();
const port = config.port

app.use(helmet());
app.use(cors({ origin: config.cors }))
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/knockknock', (req: Request, res: Response) => {
//   return res.status(200).json({ message: "Who's there?" });
// });

app.use('/sortinghat', async (req: Request, res: Response) => {
  const { studentAmount, students } =  req.body;

  try {
    const sortedStudents = await new StudentService(studentRepository).sort(students);

    res.status(200).json({
      studentAmount: studentAmount,
      gryffindor: sortedStudents['gryffindor'],
      hufflepuff: sortedStudents['hufflepuff'],
      ravenclaw: sortedStudents['ravenclaw'],
      slytherin: sortedStudents['slytherin']
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to sort students due to issues arose during the sorting ceremony'});
  }
});

// localhost:3000/sortinghat

// {
//   "studentAmount": 3,
//   "students": [
//     {
//       "name": "Beta"
//     },
//     {
//       "name": "Tum"
//     },
//     {
//       "name": "Fame"
//     }
//   ]
// }

app.listen((port), () => {
  console.log('⚡️ Server is running on port ' + port);
})
