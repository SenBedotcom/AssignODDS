import { Student } from '../model/Student';
import { IStudentService } from './IStudentService';
import { IStudentRepository } from '../repository/IStudentRepository';

export class StudentService implements IStudentService {
  constructor (private readonly studentRepository: IStudentRepository) {}

  async getStudent (studentId: string): Promise<Student | undefined | null> {
    return this.studentRepository.getStudent(studentId);
  }

  async sort (students: Student[]): Promise<Record<string, Student[]>> {
    const sortedStudents = assignStudentsToHouses(students);
    const records = await this.studentRepository.createStudents(students);
    return sortedStudents;
  }
}

function assignStudentsToHouses (student: Student[]): Record<string, Student[]> {
  const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

  const shuffledStudents = shuffle<Student>(student);

  const numStudents = shuffledStudents.length;
  const numHouses = 4;
  const partSize = Math.floor(numStudents / numHouses);
  const parts: Student[][] = [];

  for (let i = 0; i < numHouses - 1; i++) {
    parts.push(shuffledStudents.slice(i * partSize, (i + 1) * partSize));
  }

  if (numStudents % numHouses !== 0) {

    shuffledStudents.forEach((student) => {
      const randomIndex = Math.floor(Math.random() * 3) + 1;
      parts[randomIndex - 1].push(student)
    });
  } else {
    parts.push(shuffledStudents.slice((numHouses - 1) * partSize));
  }

  const assignments: Record<string, Student[]> = {};
  for (let i = 0; i < numHouses; i++) {
    assignments[houses[i]] = parts[i];
  }

  return assignments;
}

// Using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle <T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}