import { Student } from '../model/Student';

export type StudentFilter = {
  id: string[]
  name: string[]
  house: string
}

export interface IStudentRepository {
  getStudent (studentId: string): Promise<Student | undefined | null>;
  getStudents (filter: StudentFilter): Promise<Student[]>;
  createStudent (student: Student): Promise<Student | null>
  createStudents (students: Student[]): Promise<Student[]>;
  updateStudent (studentId: string, student: Student): Promise<Student>;
  deleteStudent (studentId: string): Promise<Student>;
}