import { Request, Response } from 'express';

export interface ISortingHatController {
  sortStudents (req: Request, res: Response): Promise<void>;
}
