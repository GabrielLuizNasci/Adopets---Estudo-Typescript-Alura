import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

const tratarErroValidacaoYup =(
    esquema: yup.Schema<unknown>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        esquema.validateSync(req.body, { abortEarly: false });
        next();
    } catch(erros) {
        const errosYup = erros as yup.ValidationError;
        const errosDeValidacao: Record<string, string> = {};
        errosYup.inner.forEach((erro) => {
            if(erro.path){
                errosDeValidacao[erro.path] = erro.message;
            }
        });
        return res.status(EnumHttpStatusCode.BAD_REQUEST).json({ erros: errosDeValidacao });
    }
};

export default tratarErroValidacaoYup;