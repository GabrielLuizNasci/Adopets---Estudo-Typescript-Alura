import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/Endereco";


export default class AdotanteController{
    constructor(private repository: AdotanteRepository) {}
    async criaAdotante(req: Request, res: Response) {
            const { nome, celular, senha, foto, endereco } = <AdotanteEntity>req.body;

            const novoAdotante = new AdotanteEntity(
                nome,
                celular,
                senha,
                foto,
                endereco
            );

            await this.repository.criaAdotante(novoAdotante);
            return res.status(201).json(novoAdotante);
    }

    async listaAdotante(req: Request, res: Response) {
        const listaDeAdotantes = await this.repository.listaAdotante();
        return res.status(200).json(listaDeAdotantes);
    }

    async atualizaAdotante(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.atualizaAdotante(
          Number(id),
          req.body as AdotanteEntity
        )
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }
    
      async deletaAdotante(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.deletaAdotante(
          Number(id)
        )
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }

      async atualizadaEnderAdotante(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.atualizadaEnderAdotante(
          Number(id),
          req.body as EnderecoEntity
        );
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }
}