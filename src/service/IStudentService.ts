import { Student } from '../model/Student';

export interface IStudentService {
  getStudent (studentId: string): Promise<Student | undefined | null>;
  sort (students: Student[]): Promise<Record<string, Student[]>>;
}
