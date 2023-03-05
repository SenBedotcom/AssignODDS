import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import prismaClient from './db';

import { IStudentRepository } from './interface/IStudentRepository';
import { IStudentService } from './interface/IStudentService';
import { ISortingHatController } from './interface/ISortingHatControler';

import { StudentRepository } from './repository/StudentRepository';
import { StudentService } from './service/StudentService';
import SortingHatController from './controller/SortingHatController';
import { IStudentController } from 'src/interface/IStudentController';
import StudentController from '@controller/StudentController';


container.registerSingleton<ISortingHatController>('SortingHatController', SortingHatController);
container.registerSingleton<IStudentController>('StudentController', StudentController);
container.register<IStudentService>('StudentService', { useClass: StudentService });
container.register<IStudentRepository>('StudentRepository', { useClass: StudentRepository });
container.register<PrismaClient>('PrismaClient', { useValue: prismaClient });

const DIContainer = {
  sortingHatController: container.resolve<ISortingHatController>('SortingHatController'),
  studentController: container.resolve<IStudentController>('StudentController'),
  studentService: container.resolve<IStudentService>('StudentService'),
  studentRepository: container.resolve<IStudentRepository>('StudentRepository'),
  prisma: container.resolve<PrismaClient>('PrismaClient')
};

export default DIContainer;
