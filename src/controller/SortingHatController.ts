import { Request, Response } from 'express';
import { IStudentService } from '../service/IStudentService';

class SortingHatController {
  private studentService: IStudentService;

  constructor (studentService: IStudentService) {
    this.studentService = studentService;
  }

  async sortStudents (req: Request, res: Response): Promise<void> {
    const { studentAmount, students } =  req.body;

    try {
      const sortedStudents = await this.studentService.sort(students);

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
  }
}

export default SortingHatController;
