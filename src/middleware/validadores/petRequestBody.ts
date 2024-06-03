import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import {pt} from 'yup-locale-pt';
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante">> = 
yup.object({
  nome: yup.string().defined().required(),
  especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
  dataNasci: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});

const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyPet.validate(req.body, {
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

export {middlewareValidadorBodyPet};