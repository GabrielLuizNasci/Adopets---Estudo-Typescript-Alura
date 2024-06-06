import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import EnderecoEntity from "../../entities/Endereco";
import {pt} from 'yup-locale-pt';
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = 
yup.object({
  cidade: yup.string().defined().required(),
  estado: yup.string().defined().required(),
});

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(esquemaBodyEndereco, req, res, next);
}

export {middlewareValidadorBodyEndereco};