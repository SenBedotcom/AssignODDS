import { injectable, inject } from 'tsyringe';
import { House, Student } from '@model/Student';
import { IStudentService } from 'src/interface/IStudentService';
import { IStudentRepository } from 'src/interface/IStudentRepository';

@injectable()
export class StudentService implements IStudentService {
  constructor(
    @inject('StudentRepository')
    private readonly studentRepository: IStudentRepository
  ) {}

  async getStudent (studentId: string): Promise<Student | undefined | null> {
    return this.studentRepository.getStudent(studentId);
  }

  async getStudents (): Promise<Student[]> {
    return this.studentRepository.getStudents();
  }  

  async sortStudents (students: Student[]): Promise<any> {
    const houses = assignStudentsToHouses(students);
    const housesEntries = Array.from(houses.entries());
    const sortedStudents = housesEntries.flatMap(([ house, students ]: [ string, Student[] ]) => students.map((student) => ({ ...student, house  })));
    const createdStudents = await this.studentRepository.createStudents(sortedStudents);
    return {
      studentAmount: createdStudents.length,
      houses: {
        gryffindor: houses.get(House.Gryffindor)?.length,
        hufflepuff: houses.get(House.Hufflepuff)?.length,
        ravenclaw: houses.get(House.Ravenclaw)?.length,
        slytherin: houses.get(House.Slytherin)?.length
      },
      createdStudents
    };
  }
  async deleteAllStudent(){
    return this.studentRepository.deleteAllStudent()
  }
}

function assignStudentsToHouses (students: Student[]): Map<string, Student[]> {
  const numHouses = 4;
  const houses = new Map<string, Student[]>([
    ['Gryffindor', []],
    ['Hufflepuff', []],
    ['Ravenclaw', []],
    ['Slytherin', []],
  ]);

  const shuffledStudents = shuffle<Student>(students);
  const numStudents = shuffledStudents.length;
  
  if (numStudents < numHouses) {
    const housesArray = Array.from(houses.keys());
    for (const student of students) {
      const randomIndex = Math.floor(Math.random() * numHouses);
      const house = housesArray[randomIndex];
      houses.get(house)!.push(student);
    }
  } else {
    if (numStudents % numHouses !== 0) {
      const randomHouse = Array.from(houses.keys())[Math.floor(Math.random() * numHouses)];
      for (let i = 0; i < numStudents % numHouses; i++) {
        houses.get(randomHouse)!.push(students.pop()!);
      }
    } else {
      for (let i = 0; i < numHouses; i++) {
        const house = Array.from(houses.keys());
        houses.get(house[i])!.push(students.pop()!);
      }
    }
  }

  if (numStudents > numHouses) {
    for (const student of students) {
      let minNumAssigned = Number.MAX_SAFE_INTEGER;
      let minHouse = '';

      for (const house of houses.keys()) {
        const numAssigned = houses.get(house)!.length;
        if (numAssigned < minNumAssigned) {
          minNumAssigned = numAssigned;
          minHouse = house;
        }
      }
      houses.get(minHouse)!.push(student);
    }
  }
  return houses;
}

// Using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle <T> (array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
