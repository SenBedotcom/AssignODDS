import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Student } from '@model/Student';
import { IStudentRepository } from 'src/interface/IStudentRepository';
import CreateStudentError from '@error/CreateStudentError';
import { empty } from '@prisma/client/runtime';

@injectable()
export class StudentRepository implements IStudentRepository {
  constructor (
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) {}

  async getStudent (studentId: string): Promise<Student | undefined | null> {
    return await this.prisma.student.findUnique({
      where: {
        id: studentId
      }
    });
  }

  async getStudents (): Promise<Student[]> {
    return await this.prisma.student.findMany();
  }

  async createStudent (student: Student): Promise<Student | null> {
    return await this.prisma.student.create({
      data: {
        name: student.name,
        house: student.house
      }
    });
  }

  async createStudents (students: Student[]): Promise<Student[]> {
    const createdStudents: Student[] = [];
    
    try{
      for (const student of students) {
      const createdStudent = await this.prisma.student.create({ data: student });
      createdStudents.push(createdStudent);
    }
    return createdStudents;
    } catch (error){
      throw new CreateStudentError();
    }
    
  }

  async updateStudent (studentId: string, student: Student): Promise<Student> {
    return await this.prisma.student.update({
      where: {
        id: studentId
      },
      data: {
        name: student.name,
        house: student.name
      }
    });
  }

  async deleteStudent (studentId: string): Promise<Student> {
    return await this.prisma.student.delete({
      where: {
        id: studentId
      }
    });
  }

  async deleteAllStudent (): Promise<number> {
    const deleteResult =  await this.prisma.student.deleteMany({})
    return deleteResult.count
  }
}
