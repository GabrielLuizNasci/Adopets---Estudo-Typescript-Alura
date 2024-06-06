import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import {pt} from 'yup-locale-pt';
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

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
    tratarErroValidacaoYup(esquemaBodyPet, req, res, next);
}

export {middlewareValidadorBodyPet};