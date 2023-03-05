import { Student } from '@model/Student';

export interface IStudentRepository {
  getStudent (studentId: string): Promise<Student | undefined | null>;
  getStudents (): Promise<Student[]>;
  createStudent (student: Student): Promise<Student | null>
  createStudents (students: Student[]): Promise<Student[]>;
  updateStudent (studentId: string, student: Student): Promise<Student>;
  deleteStudent (studentId: string): Promise<Student>;
  deleteAllStudent (): Promise<number>
}
