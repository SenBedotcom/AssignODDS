import { PrismaClient } from '@prisma/client';
import { Student } from '../model/Student';
import { IStudentRepository, StudentFilter } from './IStudentRepository';

export class StudentRepository implements IStudentRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async getStudent (studentId: string): Promise<Student | undefined | null> {
    return await this.prisma.student.findUnique({
      where: {
        id: studentId
      }
    });
  }

  async getStudents (studentFilter: StudentFilter): Promise<Student[]> {
    return await this.prisma.student.findMany({
      where: {
        AND: [
          { id: { in: studentFilter.id } },
          { name: { in: studentFilter.name } },
          { house: { equals: studentFilter.house } }
        ]
      }
    });
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

    students.map(async (student) => {
      const createdStudent = await this.prisma.student.create({ data: student });
      createdStudents.push(createdStudent);
    });

    return createdStudents;
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
}
