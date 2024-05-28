import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import {pt} from 'yup-locale-pt';

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = 
yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required().matches(
    /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
    "celular inválido."
  ),
  senha: yup.string().defined().required().matches(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
    "senha muito fraca."
  ),
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