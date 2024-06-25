import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/Endereco";

import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../tipos/tiposAdotante";


export default class AdotanteController{
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
      req: Request< TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante >,
      res: Response<TipoResponseBodyAdotante >
  ){
      const { nome, celular, senha, foto, endereco } = <AdotanteEntity>req.body;

      const novoAdotante = new AdotanteEntity(
        nome,
        celular,
        senha,
        foto,
        endereco
      );

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).json({ dados: {id: novoAdotante.id , nome, celular, endereco} });
  }

  async listaAdotante(
    req: Request< TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante >,
    res: Response<TipoResponseBodyAdotante >
  ){
    const listaDeAdotantes = await this.repository.listaAdotante();
    const dados = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco !== null? adotante.endereco : undefined,
      };
    });
    return res.json({ dados });
  }

  async atualizaAdotante(
    req: Request< TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante >,
    res: Response<TipoResponseBodyAdotante >
  ){
    const { id } = req.params;
    
    await this.repository.atualizaAdotante(Number(id),req.body as AdotanteEntity);
    
    return res.sendStatus(204);
  }
    
  async deletaAdotante(
    req: Request< TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante >,
    res: Response<TipoResponseBodyAdotante >
  ){
    const { id } = req.params;
    
    await this.repository.deletaAdotante(Number(id));

    return res.sendStatus(204);
  }

  async atualizadaEnderAdotante(
    req: Request< TipoRequestParamsAdotante, {}, EnderecoEntity >,
    res: Response<TipoResponseBodyAdotante >
  ){
    const { id } = req.params;
    
    await this.repository.atualizadaEnderAdotante(Number(id), req.body);
    
    return res.sendStatus(204);
  }
}