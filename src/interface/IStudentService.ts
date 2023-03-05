import { Student } from '@model/Student';

export interface IStudentService {
  getStudent (studentId: string): Promise<Student | undefined | null>;
  getStudents (): Promise<Student[]>;
  sortStudents (students: Student[]): Promise<Student[]>;
  deleteAllStudent(): Promise<number>;
}
