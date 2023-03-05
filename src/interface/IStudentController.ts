import { Request, Response } from 'express';

export interface IStudentController {
  getStudent (req: Request, res: Response): Promise<void>;
  getStudents (req: Request, res: Response): Promise<void>;
}
