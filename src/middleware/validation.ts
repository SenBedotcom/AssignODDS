import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema} from 'joi';

export const validationMiddleware= (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(',');
      
      console.error('Validation error: ', message);
      return res.status(422).json({ error: message });
    }
    next();
  };
};

export const sortingHatSchema = Joi.object().keys({
  studentAmount: Joi.number().required(),
  students: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required()
    })
  )
});