import { singleton, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStudentController } from 'src/interface/IStudentController';
import { IStudentService } from 'src/interface/IStudentService';

@singleton()
class StudentController implements IStudentController {
  constructor (
    @inject('StudentService') private readonly studentService: IStudentService
  ) {}

  async getStudent (req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.studentId;
      const student = await this.studentService.getStudent(studentId);
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getStudents (req: Request, res: Response): Promise<void> {
    try {
      const students = await this.studentService.getStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default StudentController;
