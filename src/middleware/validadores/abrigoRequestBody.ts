import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import {pt} from 'yup-locale-pt';
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";