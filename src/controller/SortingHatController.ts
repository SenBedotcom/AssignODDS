import { singleton, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStudentService } from 'src/interface/IStudentService';
import { ISortingHatController } from 'src/interface/ISortingHatControler';
import SortingHatError from '@error/SortingHatError';

@singleton()
class SortingHatController implements ISortingHatController {
  constructor (
    @inject('StudentService')
    private readonly studentService: IStudentService
  ) {}

  async sortStudents (req: Request, res: Response): Promise<void> {
    const { studentAmount, students } = req.body;

    try {
      if (students.length > studentAmount || students.length < studentAmount) {
        throw new SortingHatError();
      }

      const sortedStudents = await this.studentService.sortStudents(students);

      res.status(200).json({
        studentAmount,
        students: sortedStudents
      });

    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default SortingHatController;
