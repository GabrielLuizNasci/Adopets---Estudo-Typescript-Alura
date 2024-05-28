import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = 
yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required().min(11),
  senha: yup.string().defined().required().min(6),
  foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body, {
          abortEarly: false,
        });
        return next();
      } catch (error) {   
        const yupErrors = error as yup.ValidationError;

        const ValidationErrors: Record<string, string> = {};

        yupErrors.inner.forEach((error) => {
          if(!error.path) return;
          ValidationErrors[error.path] = error.message;
        })
        return res.status(400).json({ error: ValidationErrors });
      }
}

export {middlewareValidadorBodyAdotante};