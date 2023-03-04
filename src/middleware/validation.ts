import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema} from 'joi';

export const validationMiddleware= (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (error) {
      const { details } = error;
      const message = details.map((detail) => error.message).join(',');
      
      console.error('Error', message);
      return res.status(422).json({ error: message });
    }
    next();
  }
}

export const greetingHatSchema = Joi.object().keys({
  studentAmount: Joi.number().required(),
  students: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required()
    })
  )
});